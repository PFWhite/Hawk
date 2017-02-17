! function () {
    var config = {};
    window.Hawk = function (config) {
        var Hawk = function (config) {
            var self = this;
            this.constructors = {};
            this.resources = {};
            this.loadStatus = {};

            var startLoading = function (componentName) {
                return new Promise(function (resolve, reject) {
                    var xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function () {
                        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                            self.loadStatus[componentName] = 'done';
                            resolve(this.response);
                        }
                    };
                    xhr.open('GET', "/" + componentName + '/' + componentName + '.html');
                    self.loadStatus[componentName] = 'loading';
                    xhr.send();
                })
                    .then(function (response) {
                        document.write(response);
                        // this.resources[componentName] = {
                        //     templateURL: response.template,
                        //     codeURL: response.codeURL
                        // };
                    }).catch(function (test) {document.write(test.response)});
            };

            this.getComponent = function(componentName) {
                return new Promise(function (resolve, reject) {
                    if (self.loadStatus[componentName] === 'done') {
                        resolve(self.constructors[componentName]);
                    } else {
                        reject(componentName);
                    }
                })
                .catch(function (componentName) {
                    if (self.loadStatus[componentName]) {
                        return self.getComponent(componentName);
                    } else {
                        return startLoading(componentName)
                    }
                });
            };

            this.registerComponent = function (componentName, constructor) {
                self.constructors[componentName] = constructor;
                self.loadStatus[componentName] = 'done';
            };


        };
        return new Hawk();
    }();

    window.Hawk.getComponent('patrick').then(function (result) {
        console.log(result);
    });


}()
