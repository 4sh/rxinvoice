plugins {
    kotlin("jvm") version Versions.kotlin
    id("maven-publish")
}

allprojects {
    group = "rxinvoice"
    version = System.getenv("version")

    repositories {
        mavenCentral()
        jcenter()
        maven { setUrl("https://jitpack.io") }
    }
}

val developmentOnly by configurations.creating
configurations {
    runtimeClasspath {
        extendsFrom(developmentOnly)
    }
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}
