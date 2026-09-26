const { pool } = require('../config/database');

const addDpiitColumn = async () => {
  try {
    console.log('🔄 Adding dpiit_number column to startups table...');
    
    await pool.query(`
      ALTER TABLE startups 
      ADD COLUMN IF NOT EXISTS dpiit_number VARCHAR(50) UNIQUE
    `);
    
    console.log('✅ dpiit_number column added successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await pool.end();
  }
};

if (require.main === module) {
  addDpiitColumn();
}

module.exports = addDpiitColumn;