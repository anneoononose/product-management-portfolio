# Product requirements summary

## SentinelOps MVP

### User problem

Reliability teams receive many alerts but lack enough lead time and evidence to prevent customer impact.

### Required experience

- Display a forecast horizon, confidence level, and affected service.
- Explain which signals and changes contributed to the forecast.
- Show dependency impact in a service map.
- Let a human choose rollback, capacity scaling, or incident escalation.
- Record the action and eventual outcome for evaluation.

### Acceptance criteria

- Every prediction includes supporting evidence and timestamped signals.
- Predictions below the confidence threshold do not notify responders.
- No remediation executes without explicit human approval.
- Incident outcomes can be labeled correct, incorrect, or inconclusive.

## SupplyShield MVP

### User problem

Operations teams cannot rapidly connect supplier disruptions to production constraints and financial exposure.

### Required experience

- Identify components connected to an active supplier disruption.
- Calculate facility-level days of supply.
- Connect exposed production to customer-order value.
- Rank disruptions by revenue exposure and mitigation window.
- Show the SQL and records behind every analytical result.

### Acceptance criteria

- Every financial figure can be traced to customer-order records.
- Planners can distinguish measured data from modeled estimates.
- The product displays data freshness and missing-source warnings.
- Mitigation recommendations identify their assumptions and constraints.

