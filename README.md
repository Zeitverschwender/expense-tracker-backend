# Expense Tracker Backend

[![GitHub Release][github_release_badge]][github_release_link]
[![License][license-image]][license-url]

REST API for [Expense Tracker](https://github.com/Zeitverschwender/expense-tracker-backend) Frontend app.

## Run the code locally

1) Clone the repo

    ```sh
    git clone https://github.com/Zeitverschwender/expense-tracker-backend
    cd expense-tracker-backend
    ```

1) Duplicate ``.env.example`` file and rename it to ``.env`` and fill in the required fields.

1) Install requiremnets and start the server.

    ```sh
    npm install
    npm start
    ```

## Deployment

To deploy the api to a live/production server. You can either use docker, docker-compose or K8s.

### Docker

Duplicate ``.env.example`` file and rename it to ``.env`` and fill in the required fields or pass it through command line arguemnts when running ``docker run``. Change the first part of the tag to your dockerhub id)

```sh
docker build -t digitalphoenixx/expense-tracker-api:latest .
docker run -p 8000:8000 digitalphoenixx/expense-tracker-api:latest
```

Replace build tag and port used with appropriate values.

### Docker-compose

Duplicate the ``.env`` file and fill in the data. Replace the port number in the ``docker-compose.yml`` file with preferred port. Then run

```sh
docker-compose up
```

### K8s

1) Build the image. (change the first part of the tag to your dockerhub id)

    ```sh
    docker build -t digitalphoenixx/expense-tracker-api:latest .
    ```

1) Change the image name in the ``.k8s/kustomization.yml`` to the tag used in the build step.

1) Fill in ``FRONTEND_URL`` in ``.k8s/config.yml``.

1) Change the hostname in the ``.k8s/ingress.yml`` to your domain.

1) Create deployment.

    ```sh
    kubectl apply -k .k8s/
    ```

1) Create the secret with the mongo connection string.

    ```sh
    kubectl create secret generic expense-tracker-api-secret -n expense-tracker --from-literal=DB_CONNECTION="VALUE_HERE" --from-literal=GOOGLE_CLIENT_ID="VALUE_HERE" --from-literal=GOOGLE_CLIENT_SECRET="VALUE_HERE" --from-literal=JWT_SECRET="VALUE_HERE"
    ```

1) Check the everything is running, might take a second. Note: Ready is 1/1.

    ``` sh
    > kubectl get -n expense-tracker all

    NAME                                                  READY   STATUS    RESTARTS   AGE
    pod/expense-tracker-api-deployment-69f94b7657-584xf   1/1     Running   0          24s

    NAME                                  TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE
    service/expense-tracker-api-service   ClusterIP   10.101.156.245   <none>        8000/TCP   24s

    NAME                                             READY   UP-TO-DATE   AVAILABLE   AGE
    deployment.apps/expense-tracker-api-deployment   1/1     1            1           24s

    NAME                                                        DESIRED   CURRENT   READY   AGE
    replicaset.apps/expense-tracker-api-deployment-69f94b7657   1         1         1       24s
    ```

## Built With

* [VS Code](https://code.visualstudio.com/) - Code Editor
* [Docker Desktop](https://www.docker.com/products/docker-desktop) - Containerization

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository][github-tags].

## Authors

* **Sameh Amnoun** - Main Dev - [SamehAmnoun](https://github.com/SamehAmnoun)
* **Mohamed Walid** - Main Dev - [m-walid](https://github.com/m-walid)
* **Mohamed Said Sallam** - Main Dev - [TheDigitalPhoenixX](https://github.com/TheDigitalPhoenixX)

See also the list of [contributors][github-contributors] who participated in this project and their work in [CONTRIBUTORS.md](CONTRIBUTORS.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* [README.md Template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)

[license-image]: https://img.shields.io/badge/License-MIT-brightgreen.svg
[license-url]: https://opensource.org/licenses/MIT

[github_release_badge]: https://img.shields.io/github/v/release/Zeitverschwender/expense-tracker-backend.svg?style=flat&include_prereleases
[github_release_link]: https://github.com/Zeitverschwender/expense-tracker-backend/releases

[github-contributors]: https://github.com/Zeitverschwender/expense-tracker-backend/contributors
[github-tags]: https://github.com/Zeitverschwender/expense-tracker-backend/tags
