# Configure Pulumi

## Install Pulumi
```sh
#Download
curl -fsSL https://get.pulumi.com | sh

#Confirm the installation
pulumi version
```

## Set up Pulumi
```sh
pulumi login
```



## Create a new project
1. Create a new project
```sh
pulumi new aws-typescript
```
2. Install dependencies
```sh
npm install @pulumi/aws
```
3. Create a new stack
```sh
pulumi stack init dev
```

## Deploy the app
1. Start the app
```sh
pulumi up
```
2. Destroy the app
```sh
pulumi destroy
```

## Check resources
1. Check stack
```sh
pulumi stack ls
```
2. Remove stack
```sh
pulumi stack rm dev
```
