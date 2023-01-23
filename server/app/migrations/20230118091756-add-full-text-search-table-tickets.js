"use strict";

const vectorName = "_search";

const searchObjects = {
  tickets: ["title", "description"],
};

const tableName = "tickets";
const targetCols = ["title", "description"];
const columnName = "_search";

module.exports = {
  up: async (queryInterface) => {
    const { sequelize } = queryInterface;

    try {
      await sequelize.query(
        `ALTER TABLE "${tableName}" ADD COLUMN "${columnName}" TSVECTOR`
      );
      await sequelize.query(
        `UPDATE "${tableName}" SET "${columnName}" = to_tsvector('english', ${targetCols[0]} || ' ' || ${targetCols[1]} )`
      );
      await sequelize.query(
        `CREATE INDEX ${tableName}_search ON ${tableName} USING gin(${columnName})`
      );
      await sequelize.query(
        `CREATE TRIGGER updateSearchIndex BEFORE INSERT OR UPDATE ON "${tableName}" FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger("${columnName}", 'pg_catalog.english', ${targetCols.join(
          ", "
        )})`
      );
    } catch (error) {
      return {
        status: "failed",
        message: error.message,
      };
    }

    return {
      status: "completed",
      message: "migrations completed successfully",
    };
  },
  down: async (queryInterface) => {
    const { sequelize } = queryInterface;

    try {
      await sequelize.query(`DROP TRIGGER updateSearchIndex ON "${tableName}"`);
      await sequelize.query(`DROP INDEX ${tableName}_search;`);
      await sequelize.query(
        `ALTER TABLE "${tableName}" DROP COLUMN "${columnName}"`
      );
    } catch (error) {
      return {
        status: "failed",
        message: error.message,
      };
    }
  },
};
