function () {
    var config = {};
    window.Hawk = function (config) {
        var Hawk = function (config) {
            var self = this;
            this.constructors = {};
            this.loadStatus = {};

            var startLoading = function (componentName) {
                return new Promise(function (resolve, reject) {
                    var xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function () {
                        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                            resolve(this.response);
                        } else if (this.status != 200) {
                            reject(this.response);
                        }
                    };
                    xhr.open('GET', "/components/" + componentName);
                    self.loadStatus[componentName] = 'loading';
                    xhr.send();
                });
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
                            .then(function () {
                                self.getComponent(componentName);
                            });
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
}()
