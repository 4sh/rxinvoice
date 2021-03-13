plugins {
    war
    kotlin("jvm")
    id("maven-publish")
}

kotlinProject()

dependencies {

    "implementation"("io.restx:restx-core:${Versions.restx}")
    "implementation"("io.restx:restx-core-annotation-processor:${Versions.restx}")
    "implementation"("io.restx:restx-factory:${Versions.restx}")
    "implementation"("io.restx:restx-i18n:${Versions.restx}")
    "implementation"("io.restx:restx-core-java8:${Versions.restx}")
    "implementation"("io.restx:restx-jongo:${Versions.restx}")
    "implementation"("io.restx:restx-factory-admin:${Versions.restx}")
    "implementation"("io.restx:restx-monitor-admin:${Versions.restx}")
    "implementation"("io.restx:restx-i18n-admin:${Versions.restx}")
    "implementation"("io.restx:restx-log-admin:${Versions.restx}")
    "implementation"("io.restx:restx-server-jetty8:${Versions.restx}")
    "implementation"("io.restx:restx-apidocs:${Versions.restx}")
    "implementation"("io.restx:restx-barbarywatch:${Versions.restx}")
    "implementation"("org.mindrot:jbcrypt:0.3m")
    "implementation"("ch.qos.logback:logback-classic:1.0.9")
    "implementation"("commons-fileupload:commons-fileupload:1.3.1")
    "implementation"("commons-beanutils:commons-beanutils:1.9.4")
    "implementation"("org.apache.commons:commons-lang3:3.9")
    "implementation"("org.apache.poi:poi-ooxml:3.16")
    "implementation"("com.openhtmltopdf:openhtmltopdf-core:1.0.0")
    "implementation"("com.openhtmltopdf:openhtmltopdf-pdfbox:1.0.0")
    "implementation"("com.github.spullara.mustache.java:compiler:0.9.6")
    "implementation"("com.github.4sh.datamaintain:datamaintain-core:1.1.0")
    "implementation"("com.github.4sh.datamaintain:datamaintain-driver-mongo:1.1.0")
//        "implementation"("org.jetbrains.kotlin:kotlin-bom:1.3.70")

    "testImplementation"("io.restx:restx-jongo-specs-tests:${Versions.restx}")
    "testImplementation"("org.junit.platform:junit-platform-launcher:1.6.1")
    "testImplementation"("org.junit.jupiter:junit-jupiter-engine:5.6.1")
    "testImplementation"("org.junit.vintage:junit-vintage-engine:5.6.1")
}
