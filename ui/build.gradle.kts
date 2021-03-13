import com.moowork.gradle.node.yarn.YarnTask

plugins {
    id("com.github.node-gradle.node") version "2.2.0"
}

node {
    version = "14.10.1"
    yarnVersion = "1.22.4"
    download = true
}

val yarn_build by tasks.getting(YarnTask::class) {
    dependsOn("yarn_install")
}

tasks.create("build") {
    dependsOn("yarn_build")
}
