#!/bin/bash
echo "🚀 Creating backup..."
cp -r /Users/tarek/Downloads/modern-erp-system /Users/tarek/Downloads/erp-backups/erp_backup_$(date +%Y%m%d_%H%M%S)
echo "✅ Backup completed"
