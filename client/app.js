function () {
    var config = {};
    window.Hawk = function (config) {
        var Hawk = function (config) {
            var self = this;

            this.getComponent = function(componentName) {
                return new Promise(function (resolve, reject) {
                    var xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function () {
                        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                            resolve(this.response);
                        }
                    };
                    xhr.open('GET', "/components/" + componentName);
                    xhr.send();
                }).then(function (response) {
                    return self.loadComponent(response);
                });
            };

            this.loadComponent = function (response) {
                return new Promise(function (resolve, reject) {
                    var scriptTag = window.document.createElement('script');
                    scriptTag.url = response.codeURL;
                    window.document.getElementsByTagName('body')[0].appendChild(scriptTag);
                    self[response.componentName + '_loaded'] = false;
                    resolve(self.componentOrRetry(response.componentName));
                });
            };

            this.componentOrRetry(componentName) {
                return new Promise(function (resolve, reject) {
                    if (self[componentName + '_loaded']) {
                        resolve(self[componentName + '_constructor']);
                    } else {
                        window.setTimeout()
                    }
                });
            }

        };
        return new Hawk();
    }()
}
