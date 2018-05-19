function Authorization(auth, providergoogle, providerfacebook) {
    return {

        //metody wywołujące funkcje firebase
        handleGoogleAuth: function () {
            const promise1 = new Promise((resolv, reject) => {
                auth.signInWithPopup(providergoogle).then(function (result) {
                    var user = result.user;

                    console.log("whatever");
                    resolv(user);
                }).catch(function (error) {

                    console.log(error);
                    reject(error);
                });
            });
            return promise1;
        },
        handleFacebookAuth: function () {
            const promise2 = new Promise((resolv, reject) => {
                auth.signInWithPopup(providerfacebook).then(function (result) {
                    var user = result.user;

                    console.log("whatever");
                    resolv(user);
                }).catch(function (error) {

                    console.log(error);
                    reject(error);
                });
            });
            return promise2;
        },
        //metoda logowania email
        handlePasswordAuth: function (loginCommand) {
            const promise3 = new Promise((resolv, reject) => {
                auth.signInWithEmailAndPassword(loginCommand.email, loginCommand.password)
                    .then(function (result) {
                        var user = result.user;

                        console.log("whatever");
                        resolv(user);
                    }).catch(function (error) {
                        auth.createUserWithEmailAndPassword(loginCommand.email, loginCommand.password)
                            .then(function (result) {
                                var user = result.user;
                                resolv(user);
                            })
                            .catch(function (error) {
                                console.log(error);
                                reject(error);
                            });


                    });
            });
            return promise3;
        }
    };
}

export default Authorization;
