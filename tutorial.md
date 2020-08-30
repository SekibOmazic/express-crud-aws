# How to create full stack with cloudformation

## Create docker image

From the root directory run:

```
docker build -t users-api .
```

Run the docker container locally to test it:

```
docker run -it -p 4000:4000 --rm users-api:latest
```

## ECR - Elastic Container Registry

AWS ECR is a registry for your docker containers

### Creating an ECR

We will create an ECR with AWS CLI but in the later step, when adding CI/CD we will define it as a Cloudformation resource

From the terminal run:

```
aws ecr create-repository --repository-name users-api
```

Now log in into ECR:

```
aws ecr get-login-password \
| docker login \
    --username AWS \
    --password-stdin <aws_account_id>.dkr.ecr.<region>.amazonaws.com
```

To push docker image to the ECR we need the repostiory URI. To get it, run:

```
aws ecr describe-repositories --repository-name users-api
```

Tag the image

```
docker tag users-api 486453932063.dkr.ecr.eu-central-1.amazonaws.com/users-api:v1
```

Push the image to the ECR

```
docker push 486453932063.dkr.ecr.eu-central-1.amazonaws.com/users-api:v1
```

## Cloudformation stacks

Next we create needed resources using cloudformation

### VPC Stack

This defines one VPC (Virtual Private Cloud) with 2 Subnets and an Internet Gateway

```
aws cloudformation create-stack --stack-name vpc --template-body file://$PWD/infrastructure/vpc.yaml
```

### IAM

Roles and permissions

```
aws cloudformation create-stack --stack-name iam --template-body file://$PWD/infrastructure/iam.yaml --capabilities CAPABILITY_IAM
```

### ECS Cluster

Fargate cluster

```
aws cloudformation create-stack --stack-name cluster --template-body file://$PWD/infrastructure/cluster.yaml
```

### ECS Service

Fargate Service

```
aws cloudformation create-stack --stack-name service --template-body file://$PWD/infrastructure/service.yaml
```
