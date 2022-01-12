'use strict'
const cls = new Classmyalertjs();
const fnc = Funcmyalertjs;
// testing
// cls.messaggio("Call method messaggio");
// fnc.showMyAlert("titolo", "messaggio.", "var(--info)", "var(--white)", "var(--warning)", "var(--dark)");
const fileSelector = document.getElementById('file-selector');
let obj_img = Object();
let ar_img = Array();
let fileListArr = Array();
fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    /*
        console.log("fileSelector ", fileList);
        console.log("fileSelector ", fileSelector.files);
        console.log("fileSelector num ", fileSelector.files.length);
        console.warn("Type file", fileList[0].type);
    */
    /*
    obj_img = {
        immagine: fileSelector.files
    }
    ar_img.push(obj_img);
    getMetadataForFileList(ar_img[0].immagine); 
    */
    for (var i = 0; i < fileSelector.files.length; i++) {
        /*
        console.table({
            dimensioni: Math.round(fileSelector.files[i].size / 1000),
            tipo: fileSelector.files[i].type
        });
        */
        if (Math.round(fileSelector.files[i].size / 1000) > 5400) {
            fnc.showMyAlert("avviso", "le dimensione file o più files sono superiori a 5.4mb", 'var(--warning)', 'var(--danger)', 'var(--danger)', 'var(--dark)');
            return false;
        } else {
            if (fileList[i].type != 'image/png' && fileList[i].type != 'image/jpg' && fileList[i].type != 'image/jpeg' && fileList[i].type != 'application/zip' && fileList[i].type != 'image/gif' && fileList[i].type != 'application/pdf') {
                fileSelector.value = null;
                fnc.showMyAlert("avviso", `formato immagine supportati (png, jpg e jpeg)`, 'var(--danger)', 'var(--warning)', 'var(--warning)', 'var(--dark)');
                return false;
            } // ./if
        } // ./else
    } // ./for

    fileListArr = Array.from(fileSelector.files);
    /*
    console.log("File-selector-number ", fileListArr.length);
    console.log("File-selector-name ", fileListArr[0].name);
    console.log("File-selector-type ", fileListArr[0].type);
    console.log("File-selector-size ", fileListArr[0].size);
    */
    getMetadataForFileList(fileListArr);
});
const dropArea = document.querySelector('.list-image');
// const dropArea = document.getElementById('drop_area');
/*
dropArea.addEventListener('dragover', (event) => {
    event.stopPropagation();
    event.preventDefault();
    // Style the drag-and-drop as a "copy file" operation.
    event.dataTransfer.dropEffect = 'copy';
});

dropArea.addEventListener('drop', (event) => {
    event.stopPropagation();
    event.preventDefault();
    const fileList = event.dataTransfer.files;
    // console.log(fileList);

});
*/
const content_progress_bar = document.querySelector('.progress-bar-content');
const progress_bar = document.querySelector('.progress-bar');
const button_save_image = document.querySelector('.btn-save');
const button_default = document.querySelector('.btn-refresh');
var valore = 0;

function progressBAR() {
    if (valore == 0) {
        valore = 1;
        let width = 1;
        let id = setInterval(frame, 50);

        function frame() {
            if (width >= 100) {
                clearInterval(id);
                valore = 0;
                button_save_image.style.display = 'block';
                button_default.style.display = 'block';
            } else {
                button_save_image.style.display = 'none';
                button_default.style.display = 'none';
                width++;
                content_progress_bar.style.setProperty("border", "1px solid var(--white)");
                progress_bar.style.display = "block";
                progress_bar.style.height = "25px";
                progress_bar.style.width = `${width}%`;
                progress_bar.innerHTML = `${width} %`;
                progress_bar.style.setProperty("border-radius", "8px");
                progress_bar.style.setProperty("padding-top", "10px");
            } // ./else
        } // ./frame
    } // ./if
}

function getMetadataForFileList(fileList) {
    for (const file of fileList) {
        // Not supported in Safari for iOS.
        const name = file.name ? file.name : console.log('Safari NOT SUPPORTED');
        // Not supported in Firefox for Android or Opera for Android.
        const type = file.type ? file.type : console.log('FireFox NOT SUPPORTED');
        // type == "image/png" ? console.log("Supported") : console.log("Not Supported");
        // Unknown cross-browser support.
        const size = file.size ? file.size : console.log('Unknow NOT SUPPORTED');
        // console.table({ file, name, type, size });
        if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg' || file.type == 'application/zip' || file.type == 'image/gif' || file.type == 'application/pdf') {
            readImage(file);
        } else {
            fnc.showMyAlert("avviso", `formato immagine supportato (png, jpg e jpeg) ${file.name}`, 'var(--danger)', 'var(--warning)', 'var(--warning)', 'var(--dark)');
        }
        // readImage(file);
    }

}

function readImage(file) {
    // Check if the file is an image.
    dropArea.innerHTML = null;
    /*
    if (file.type && !file.type.startsWith('image/')) {
        console.log('File is not an image.', file.type, file);
        return false;
    }
    */
    const reader = new FileReader();

    reader.addEventListener('load', (event) => {
        const content = document.createElement('div');
        content.style.setProperty('border', '1px solid var(--secondary)');
        content.style.setProperty('border-radius', '50%');
        content.style.setProperty('box-shadow', 'var(--box-shadow');
        content.style.width = "100px";
        content.style.height = "110px";
        content.style.setProperty('position', 'relative');

        const img = document.createElement('img');
        img.style.setProperty('border-radius', '50%');
        img.style.width = "100%";
        img.style.height = "110px";
        const controlFile = file.type;
        if (controlFile == "application/zip") {
            img.src = "img/zip4.png";
        } else if (controlFile == "application/pdf") {
            img.src = "img/pdf.png";
        } else {
            img.src = event.target.result;
        }

        const img_delete = document.createElement('img');
        img_delete.src = "img/close.png";
        img_delete.style.cursor = "pointer";
        img_delete.style.width = "20px";
        img_delete.style.height = "20px";

        const a = document.createElement('a');
        a.target = "_blank";
        a.href = event.target.result;
        a.appendChild(img);



        const a_delete = document.createElement('a');
        a_delete.id = file.name;
        a_delete.style.setProperty('position', 'absolute');
        a_delete.style.setProperty('top', '14px');
        a_delete.style.left = "12px";
        // a_delete.href = "https://google.it";
        a_delete.appendChild(img_delete);
        a_delete.addEventListener('click', function() {
            dropArea.removeChild(content);
            //dropArea.removeChild(this);

            /*
            var obj = Object();
            obj = [{ lettera1: "valore a", lettera2: "valore b" }, { lettera1: "valore a-2", lettera2: "valore b-2" }];
            var ar = Array();
            ar.push(obj);
           
            for (var val in ar) {
                // or
                //for (var val of ar) {
                console.log("value", val);
                console.log("ar", ar[val][0].lettera1);
            }

            */
            /*  console.log(fileSelector.files[0]);
             console.group('begin');
             console.log(fileSelector.files);
             console.groupEnd('begin'); */

            if (fileListArr.length > 0) {
                console.table({
                    "Befor": 1,
                    "Container fileListArr ": fileListArr,
                    "Number fileListArr": fileListArr.length,
                });
            }
            for (var uid = 0; uid < fileListArr.length; uid++) {
                if (this.id == fileListArr[uid].name) {
                    console.warn("Delete element from fileListArr!!!");
                    fileListArr.splice(uid, 1); // here u remove the file
                } // ./if
            } // ./for

            if (fileListArr.length > 0) {
                console.table({
                    "after": 0,
                    "Container fileListArr ": fileListArr,
                    "Number fileListArr": fileListArr.length,
                });
            } // ./if
            // getMetadataForFileList(fileListArr);


        });


        content.appendChild(a);
        content.appendChild(a_delete);
        dropArea.appendChild(content);
        //dropArea.appendChild(a_delete);

    });
    progressBAR();
    reader.readAsDataURL(file);

}

let caricamento = 0;
let percent = 0;
// ## SOPSESA
/*
function readFile(file) {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        const result = event.target.result;
        // Do something with result
        // console.log("Result ", result);
    });
    // console.log(reader);
    reader.addEventListener('progress', (event) => {
        // progress_bar.style.width = `0%`;
        if (event.lengthComputable) {
            /*
            if (event.loaded && event.total) {
                if (event.lengthComputable) {
                    percent = (event.loaded / event.total) * 100;
                    caricamento = Math.round(percent);
                    console.table({
                        loaded: event.loaded,
                        total: event.total,
                        percentuale: percent,
                        lentgthComputable: event.lengthComputable
                    });
                } // ./if event.loaded && event.total
                */
/*
for (var prg = 0; prg < 100; prg++) {
    caricamento = prg;
}
*/
/*
progress_bar.style.display = "block";
progress_bar.style.width = `${caricamento+1}%`;
progress_bar.style.height = "25px";
progress_bar.style.setProperty("border-radius", "8px");
progress_bar.style.setProperty("padding-top", "10px");
content_progress_bar.style.setProperty("border", "1px solid var(--white)");
progress_bar.innerHTML = `${caricamento+1} %`;
*/
// } // ./event.lengthComputable
//}); // ./progress
// readImage(file);
// reader.readAsDataURL(file);
//}
// ## SOPSESA
async function letturaFileImage() {
    let url = "docs/pages/load-file.php";
    /*
    console.log({
        contenuto: fileSelector.files,
        lunghezza: fileSelector.files.length
    });
    */
    // console.log(fileSelector.files[0].type);
    console.log("fileListArr ", fileListArr);
    if (fileListArr.length > 0) {
        for (var control = 0; control < fileListArr.length; control++) {
            var typeFile = fileListArr[control].type;
            // console.log(typeFile);
            if (typeFile == "image/png" || typeFile == "image/jpeg" || typeFile == "image/jpg" || typeFile == 'image/gif' || typeFile == 'application/zip' || typeFile == 'application/pdf') {
                // code ok
            } else {
                fnc.showMyAlert("avviso", `formato immagine non supportato`, 'var(--danger)', 'var(--warning)', 'var(--white)', 'var(--dark)');
                return false;
            }
        } // ./for
        const frmData = new FormData();
        for (var indice = 0; indice < fileListArr.length; indice++) {
            frmData.append(`images${indice}`, fileListArr[indice]);
        }

        frmData.append("numImage", fileListArr.length);
        const hd = new Headers({
            // "Content-Type": "application/json"
            // 'Content-Type': 'application/x-www-form-urlencoded'
            'Content-Type': 'multipart/form-data',
        });
        const rq = new Request(url, {
            method: "POST",
            mode: "cors",
            //headers: hd,
            body: frmData //JSON.stringify({ date })
        });
        await fetch(rq)
            .then((rs) => {
                if (rs.ok) {
                    return Promise.resolve(rs.json());
                } else {
                    return Promise.reject({
                        message: rs.statusText.toLowerCase(),
                        code: rs.status,
                        testo: "errore"
                    });
                }
            })
            .then((data) => {
                console.log({
                    receive: data
                });
                var num = data.length - 1;
                if (data[0].status == 200) {
                    dropArea.innerHTML = "<span class='root-text-color-secondary'>lista image</span>";
                    progress_bar.innerHTML = "";
                    progress_bar.style.width = "0";
                    progress_bar.style.display = "none";
                    content_progress_bar.style.setProperty("border", "none");
                    fileSelector.value = null;
                    fileListArr = [];
                    fnc.showMyAlert("avviso", `status 200, ${data[num].numfile} files salvati correttamente. guarda anche nella console del browser`, 'var(--success)', 'var(--yellow)', 'var(--white)', 'var(--indianred)');
                }
            })
            .catch((error) => {
                fnc.showMyAlert("avviso", `${error.testo} ${error.message} ${error.code}`, 'var(--danger)', 'var(--warning)', 'var(--warning)', 'var(--dark)');
            })
    } else {
        fnc.showMyAlert("avviso", `non hai selezionato immagini`, 'var(--danger)', 'var(--warning)', 'var(--warning)', 'var(--dark)');
    }
}