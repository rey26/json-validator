function validateObjectKeys(input) {
    const template = {
        "Object1": {
            "ID": 234,
            "Available": true,
            "Name": "String content",
            "SearchFilter": {
                "Type": 1,
                "Status": 21,
                "Name": "String content",
                "PremiumOnly": true
            }
        }
    }

    function compareObjects(template, data) {
        function getAllKeyNames(o, arr, str) {
            Object.keys(o).forEach(function (k) {
                if (Object.prototype.toString.call(o[k]) === "[object Object]") {
                    getAllKeyNames(o[k], arr, (str + '.' + k));
                }
                else if (Array.isArray(o[k])) {
                    o[k].forEach(function (v) {
                        getAllKeyNames(v, arr, (str + '.' + k));
                    });
                }
                arr.push(str + '.' + k);
            });
        }

        function diff(template, data) {
            let difference = [];
            //        set length of longer array to prevent bug of the extra key in data
            let length = (template.length > data.length) ? template.length : data.length;

            for (let i = 0; i < length; i++) {
                //remove dot from the word to sort the array properly
                template[i] = (template[i] !== undefined) ? template[i].replace('.', '') : template[i];
                data[i] = (data[i] !== undefined) ? data[i].replace('.', '') : data[i];
            }
            // sort array to prevent array from error
            template.sort();
            data.sort();

           
            for (let i = 0; i < length; i++) {
                if (template[i] != data[i]) {

                    let issue = {
                        template: template[i],
                        data: data[i]
                    };
                    difference.push(issue);
                }
            }
            return difference;
        }

        const templateKeys = [];
        const dataKeys = [];
        
        getAllKeyNames(template, templateKeys, '');
        getAllKeyNames(data, dataKeys, '');
        const difference = diff(templateKeys, dataKeys); // calculate differences
        return difference;
    }

    if (input.url == undefined || input == undefined || input.data == undefined)
        return;
    let url = input.url.split("/");

    let dataName = url[url.length - 1];

    let result = [];

    if (template.hasOwnProperty(dataName) && input.data)
        result = compareObjects(template[dataName], input.data);


    if (result != undefined && result.length != 0) {
        let resultHTML = "";
        result.forEach(output => {
            resultHTML += "Template: " + output.template + " Data: " + output.data + "\n";
        });
        alert(resultHTML);
    }
}
