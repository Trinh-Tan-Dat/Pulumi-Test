## Configure AWS
1. Install AWS CLI
```sh
#Download
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"

#Unzip file
unzip awscliv2.zip

#Run the install program
sudo ./aws/install

#Confirm the installation
aws --version
```

2. Set up AWS Credentials
```sh
aws configure

# Configure
AWS Access Key ID [None]: YOUR_ACCESS_KEY
AWS Secret Access Key [None]: YOUR_SECRET_KEY
Default region name [None]: us-east-1
Default output format [None]: json
```
```sh
#configure a session token
aws configure set aws_session_token YOUR_SESSION_TOKEN
```
## Check resources
1. Check VPC
```sh
aws ec2 describe-vpcs
```

2. Check Subnets
```sh
aws ec2 describe-subnets
```

3. Check Security Groups
```sh
aws ec2 describe-security-groups
```

4. Check Route Tables
```sh
aws ec2 describe-route-tables
```

5. Check Internet Gateways
```sh
aws ec2 describe-internet-gateways
```

6. Check Instances
```sh
aws ec2 describe-instances
```