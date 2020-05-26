package rxinvoice;

import datamaintain.core.Datamaintain;
import datamaintain.core.config.DatamaintainConfig;
import datamaintain.core.db.driver.DatamaintainDriverConfig;
import datamaintain.db.driver.mongo.MongoDriverConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import restx.factory.Component;

import java.util.Properties;

@Component
public class DatamaintainAutoMigrate {

    private static final Logger logger = LoggerFactory.getLogger(DatamaintainAutoMigrate.class);
    private final DatamaintainSettings datamaintainSettings;

    public DatamaintainAutoMigrate(DatamaintainSettings datamaintainSettings) {
        this.datamaintainSettings = datamaintainSettings;
    }

    public void start() {
        final Properties properties = new Properties();
        properties.put("scan.identifier.regex", datamaintainSettings.scanIdentifierRegex());
        properties.put("db.mongo.uri", datamaintainSettings.dbMongoUri());
        properties.put("scan.path", datamaintainSettings.scanPath());

        final DatamaintainDriverConfig datamaintainDriverConfig = MongoDriverConfig.buildConfig(properties);
        final DatamaintainConfig datamaintainConfig = DatamaintainConfig.buildConfig(datamaintainDriverConfig, properties);
        new Datamaintain(datamaintainConfig).updateDatabase();
    }
}
