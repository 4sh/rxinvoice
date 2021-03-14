import org.gradle.api.Project
import org.gradle.api.tasks.testing.Test
import org.gradle.kotlin.dsl.dependencies
import org.gradle.kotlin.dsl.kotlin
import org.gradle.kotlin.dsl.repositories


fun Project.kotlinProject() {
    repositories {
        maven {
            name = "libs-release-local"
            credentials {
                username = "4sh-ci"
                password = "L#d4fp84"
            }
            url = uri("http://repo.4sh.fr/artifactory/libs-release-local")
        }
    }

    dependencies {
        "implementation"(kotlin("stdlib-jdk8"))
    }

    tasks.getByPath("test").doFirst {
        with(this as Test) {
            useJUnitPlatform()
            ignoreFailures = true
        }
    }
}
