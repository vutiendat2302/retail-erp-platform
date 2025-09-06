# Use Database Inventory
This project uses **MySQL** as the database engine.

---
## 1. Database Overview
### Overview:
The database support: 
- Product and category management
- Brand and supplier information
- Warehouse and store operations
- Import/Export and return processes
- Inventory tracking with batch control
- Payment history and transaction logs

### Main Entities:
- **Brand**: Stores product brand information (name, description, country, status).
- **Category**: Organizes product categories with parent-child hierarchy.
- **Product**: Detailed product info (SKU, pricing, VAT, warranty, supplier, brand).
- **Product Batch**: Tracks batches with import/expiry dates.
- **Supplier**: Supplier details for procurement.
- **Warehouse**: Information about storage locations (main, secondary, return, etc.).
- **Store**: Retail store details.
- **Store Product**: Tracks available products in each store.
- **Inventory**: Stock management with min/max thresholds.

---

## 2. Import Database
### Option A:
- Using MySQL import file "database_inventory.sql" after use file in create_data_for_database to generate data
### Option B:
- Create schema name: 'optima-project-retail-manager'
- Using MySQL import file in foder data, each file already contains data
### Option C:
- Using Docker with "inventory_dump-init.sql"

