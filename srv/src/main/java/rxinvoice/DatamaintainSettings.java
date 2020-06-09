package rxinvoice;

import restx.config.Settings;
import restx.config.SettingsKey;

@Settings
public interface DatamaintainSettings {
    @SettingsKey(key = "scan.path")
    String scanPath();

    @SettingsKey(key = "scan.identifier.regex")
    String scanIdentifierRegex();

    @SettingsKey(key = "db.mongo.uri")
    String dbMongoUri();
}
