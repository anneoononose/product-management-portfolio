-- Facilities projected to stock out within 14 days.
WITH latest AS (
  SELECT *, ROW_NUMBER() OVER (
    PARTITION BY facility_id, component_id ORDER BY snapshot_date DESC
  ) AS row_num
  FROM inventory_snapshots
), exposure AS (
  SELECT facility_id, component_id,
         on_hand_qty / NULLIF(daily_consumption_qty, 0) AS days_of_supply
  FROM latest
  WHERE row_num = 1
)
SELECT f.facility_name, c.sku, ROUND(e.days_of_supply, 1) AS days_of_supply
FROM exposure e
JOIN facilities f USING (facility_id)
JOIN components c USING (component_id)
WHERE e.days_of_supply < 14
ORDER BY e.days_of_supply;

-- Revenue commitments exposed at facilities with near-term stockouts.
WITH facility_risk AS (
  SELECT DISTINCT facility_id
  FROM inventory_snapshots
  WHERE snapshot_date = (SELECT MAX(snapshot_date) FROM inventory_snapshots)
    AND on_hand_qty / NULLIF(daily_consumption_qty, 0) < 14
)
SELECT f.facility_name,
       COUNT(o.order_id) AS exposed_orders,
       SUM(o.order_value) AS revenue_at_risk
FROM facility_risk r
JOIN facilities f USING (facility_id)
JOIN customer_orders o USING (facility_id)
WHERE o.promised_date <= CURRENT_DATE + INTERVAL '30 days'
  AND o.status IN ('CONFIRMED','IN_PRODUCTION')
GROUP BY f.facility_name
ORDER BY revenue_at_risk DESC;

-- Single-source components affected by active disruptions.
WITH source_count AS (
  SELECT component_id,
         COUNT(*) FILTER (WHERE s.approved) AS approved_sources
  FROM supplier_components sc
  JOIN suppliers s USING (supplier_id)
  GROUP BY component_id
)
SELECT c.sku, c.component_name, s.supplier_name, d.severity
FROM source_count x
JOIN components c USING (component_id)
JOIN supplier_components sc USING (component_id)
JOIN suppliers s USING (supplier_id)
JOIN disruptions d USING (supplier_id)
WHERE x.approved_sources = 1
  AND d.expected_end_at > CURRENT_TIMESTAMP
ORDER BY d.severity DESC, c.sku;


