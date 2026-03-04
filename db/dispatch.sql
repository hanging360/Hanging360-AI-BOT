CREATE TABLE dispatch_proposals (
    id SERIAL PRIMARY KEY,
    proposal_data JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_dispatch_proposals_created_at ON dispatch_proposals(created_at);