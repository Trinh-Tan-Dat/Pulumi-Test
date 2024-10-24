# Pulumi-Test

## VPC stack
Create stack vpc include: 

1. Subnet:

    Public subnet: connect to Internet Gateway

    Private subnet: connect to NAT Gateway


2. Route Table:   

    Public Route Table: connect to Internet Gateway

    Private Route Table: connect to NAT Gateway

3. Nat Gateway: allow private subnet connect to Internet

4. EC2:

    Public EC2: allow ssh from Internet

    Private EC@: allow ssh from Public EC2


5. Security Group:

Public Security Group: allow ssh to ec2 public from Internet

Private Security Group: allow ssh to ec2 private from ec2 public


## Run Backend
1. Install Dependencies:
```sh
npm install
```

2. Start the app:
```sh
ts-node server.ts
```

## Usage API
1. Create EC2:
```sh
curl -X POST http://localhost:3000/stack/create -H "Content-Type: application/json" -d '{"instanceName": "<EC2 name>"}'
```

2. Get status of EC2
```sh
curl -X GET http://localhost:3000/stack/status
```

3. Update name of EC2 using id
```sh
curl -X PUT http://localhost:3000/stack/update -H "Content-Type: application/json" -d '{
  "instanceId": "<EC2 ID>",
  "newName": "<New name for ec2>"
}'
```

4. Delete EC2 using id
```sh
curl -X DELETE http://localhost:3000/stack/delete -H "Content-Type: application/json" -d '{
  "instanceId": "<EC2 ID>"
}'
```