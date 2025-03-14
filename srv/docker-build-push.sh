#!/bin/sh

CONTAINER=4sh-invoice-core

PROJECT_ID=quatreapp

if [[ -z "$PROJECT_ID" ]]; then
    echo "Must provide GCP project id as PROJECT_ID variable in environment" 1>&2
    exit 1
fi

POM_ARTIFACT=`xmllint --nocdata  --xpath "/*[name()='project']/*[name()='artifactId']/text()" pom.xml | awk '{$1=$1};1'`
POM_VERSION=`xmllint --nocdata  --xpath "/*[name()='project']/*[name()='version']/text()" pom.xml | awk '{$1=$1};1'`
VERSION=${1:-$POM_VERSION}
ARTIFACT=${1:-$POM_ARTIFACT}
IMAGE_VERSION_SUFFIX=${2:-}

if [[ -z "$VERSION" ]]; then
    echo "Must provide version as parameter" 1>&2
    exit 1
fi

ARTIFACT_FILE=target/$ARTIFACT-$VERSION.war
if [ ! -f "$ARTIFACT_FILE" ]; then
    echo "$ARTIFACT_FILE does not exist"
    exit 1
fi

IMAGE=europe-docker.pkg.dev/quatreapp/$PROJECT_ID/$CONTAINER:$VERSION$IMAGE_VERSION_SUFFIX

echo building $IMAGE

rm target/ROOT.war
cp $ARTIFACT_FILE target/ROOT.war
docker build -t $IMAGE . && docker tag $IMAGE europe-docker.pkg.dev/quatreapp/$PROJECT_ID/$CONTAINER:latest && docker push europe-docker.pkg.dev/quatreapp/$PROJECT_ID/$CONTAINER
