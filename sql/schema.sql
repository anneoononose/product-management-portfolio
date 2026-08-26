CREATE TABLE suppliers (
  supplier_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  supplier_name TEXT NOT NULL,
  country_code CHAR(2) NOT NULL,
  risk_tier SMALLINT NOT NULL CHECK (risk_tier BETWEEN 1 AND 4),
  approved BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE components (
  component_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  sku TEXT UNIQUE NOT NULL,
  component_name TEXT NOT NULL,
  unit_cost NUMERIC(14,2) NOT NULL CHECK (unit_cost >= 0)
);

CREATE TABLE supplier_components (
  supplier_id BIGINT REFERENCES suppliers(supplier_id),
  component_id BIGINT REFERENCES components(component_id),
  lead_time_days INTEGER NOT NULL,
  allocation_share NUMERIC(5,2) NOT NULL CHECK (allocation_share BETWEEN 0 AND 100),
  PRIMARY KEY (supplier_id, component_id)
);

CREATE TABLE facilities (
  facility_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  facility_name TEXT NOT NULL,
  facility_type TEXT NOT NULL CHECK (facility_type IN ('PLANT','WAREHOUSE')),
  region TEXT NOT NULL
);

CREATE TABLE inventory_snapshots (
  facility_id BIGINT REFERENCES facilities(facility_id),
  component_id BIGINT REFERENCES components(component_id),
  snapshot_date DATE NOT NULL,
  on_hand_qty NUMERIC(16,2) NOT NULL,
  daily_consumption_qty NUMERIC(16,2) NOT NULL,
  PRIMARY KEY (facility_id, component_id, snapshot_date)
) PARTITION BY RANGE (snapshot_date);

CREATE TABLE customer_orders (
  order_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  facility_id BIGINT REFERENCES facilities(facility_id),
  promised_date DATE NOT NULL,
  order_value NUMERIC(16,2) NOT NULL,
  status TEXT NOT NULL
);

CREATE TABLE disruptions (
  disruption_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  supplier_id BIGINT REFERENCES suppliers(supplier_id),
  started_at TIMESTAMPTZ NOT NULL,
  expected_end_at TIMESTAMPTZ,
  severity TEXT NOT NULL CHECK (severity IN ('WATCH','HIGH','CRITICAL')),
  confidence NUMERIC(5,2) NOT NULL CHECK (confidence BETWEEN 0 AND 100)
);

CREATE INDEX idx_inventory_latest ON inventory_snapshots (facility_id, component_id, snapshot_date DESC);
CREATE INDEX idx_orders_commitment ON customer_orders (facility_id, promised_date) INCLUDE (order_value, status);
CREATE INDEX idx_disruptions_active ON disruptions (supplier_id, expected_end_at) WHERE severity IN ('HIGH','CRITICAL');


