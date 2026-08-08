function $(id) {
    return document.getElementById(id);
}
function show(id) {
    document.querySelectorAll(`.tool`).forEach(t => t.classList.remove('active'));
    const el = $(id);
    if(el)el.classList.add('active');
    window.scrollTo({top: el.offsetTop - 80, behavior: 'smooth' });
}

window.addEventListener('DOMContentLoaded', function(){
    show('home');
});
//PasswordGenerator
function generatePassword()  {
    const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-+";
      let password="";

    for (let i = 0 ; i < 12 ; i++) {
        password +=
        chars.charAt(Math.floor(Math.random() * chars.length));
            }


        document.getElementById("password").value  
        = password;
        }

//copy Password
    function copyPassword() {
        const password =
        document.getElementById("password");

        if (password.value ==="") {
            alert("Generate a password first");
            return;
         }

        password.select();
        password.setSelectionRange(0, 99999);

        navigator.clipboard.writeText(password.value);

        alert("Password Copied!");

        }

    //QR Code Generator
    function generateQR() {
        const qr = 
    document.getElementById("qrCode");
        qr.innerHTML ="";

        const text =  
     document.getElementById("qrText").value.trim();

        if (text === "")  {
            alert("please enter text or URL");
            return;

        }

        new QRCode (qr, {
            text: text,
            width:180,
            height:180,
        });
    }
    //Text Case Converter
    function toUpperCaseText() {
        const text = 
    document.getElementById("textInput");
        text.value = text.value.toUpperCase();
    }

    function toLowerCaseText() {
        const text =
        document.getElementById("textInput");
        text.value = text.value.toLowerCase();
    }

    function toTitleCase() {
        const text =
        document.getElementById("textInput");
        text.value = text.value.replace(
            /\w\s*/g,
            function(word) {
                return
                word.charAt(0).toUpperCase() +
                word.substr(1).toLowerCase();

            }
        );
    }

    function clearText() {
        document.getElementById("textInput").value = "";
    }

    //word Counter
    function countWords() {
        const text = 
        document.getElementById("wordInput").value.trim();

        const words = text === "" ? 0 :
        text.split(/\s+/).length;
        const chars = text.length;


        document.getElementById("wordCount").innerText = words;

        document.getElementById("charCount").innerText = chars;
    }

//Password Strength Checker
function checkPasswordStrength() {
    const password =
    document.getElementById("strengthPassword").value;
    const result =
    document.getElementById("strengthResult");
    
    
    let strength = "Weak";
    let score = 0;
    
    if (password. length >= 8) score++;
    if(/[A-Z]/.test(password)) score++;
    if(/[a-z]/.test(password)) score++;
    if(/[0-9]/.test(password)) score++;
    if(/[^A-Za-z0-9]/.test(password)) score++;
    if (score >= 5) {
        strength = "Very Strong 💪";
    } else if (score >= 4) {
        strength = "Strong ✅";
     } else if (score >= 3) {
        strength = "Medium=⚠";
     } else  {
        strength = "Weak ❌";

     }

     result.innerHTML = "Password Strength  <b>" +  strength + "</b>";
}

function resizeImage() {
    const file =
    document.getElementById("imageInput").files[0];

    if (!file) {
        alert("please select an image.");
        return;

    }

    const width =
    parseInt(document.getElementById("width").value);
    const height =
    parseInt(document.getElementById("height").value);

    const reader = new Filereader();

     reader.onload = function (e) {
       
        const img = new Image();

        img.onload = function () {
            const canvas =
            document.getElementById("canvas");
            const ctx =
            canvas.getContext("2d");

            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(image, 0, 0, width, height);

            const link =
            document.getElementById("downloadBtn");
            link.href =
            canvas.toDataURL("image/png");
            link.innerText = "Download Resized Image";
        };

        img.src = e.terget.result;
    };

       reader.readAsDataURL(file);

    }

    function compressImage() {
        const file =
        document.getElementById("compressImageInput").files[0];

        if (!file) {
            alert("please select an image.");
            return;
        }

        const quality =
        document.getElementById("quality").value / 100;

       document.getElementById("qualityValue").innerText = (quality * 100) + "%";

       const reader = newFileReader();

       reader.onload = function (e)
{
       const img = new Image();

       img.onload = function()
{
       const canvas =
     document.getElementById("compressCanvas");
       const ctx =
    canvas.getContext("2d");

        canvas.width = img.width
          canvas.height = img.height

       ctx.drawImage(img, 0, 0);

        const compressedData =canvas.toDataURL("image/jpeg",quality);
  
         const downloadLink = document.getElementBId("downloadCompressedImage");
          downloadLink.href = compressedData;
          downloadLink.download= "compressed-image.jpg";
          downloadLink.innerText = "Download Compressed Image";
 };

             img.src = e.target.result;
};

            reader.readAsDataURL(file);
}

           // Slider percentage update
          document.getElementById("quality").addEventListener("input", function () {

         document.getElementById("qualityValue").innerText = this.value + "%";
    });

    async function convertToPDF() {
        const files = 
        document.getElementById("pdfImageInput").files;

        if (files.length === 0) {
            alert ("please select one or more images.");
            return;
        }

        const { jsPDF } = window.jspdf;
        constpdf = new jsPDF();

        for (let i = 0; i < files.length; i++) {
            const file =files[i];

          const dataUrl = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) =>resolve(e.target.result);
            reader.readAsDataURL(file);
          });

          const img = new Image();

          await new Promise((resolve) => {
            img.onload = resolve;
            img.src = dataUrl
          });

          const pagewidth =pdf.internal.pageSize.width();
          const pageheight = (img.height * pagewidth) / img.width;

          if (i > 0) {
            pdf.addpage();

          }

          pdf.addImage(img, "Jpeg", 0, 0, pagewidth, pageheight);
        }

        pdf.save("images.pdf");
    }

    function countCharacters() {
        const text = 
        document.getElementById("charInput").value;

        document.getElementById("totalChars").innerText = text.length;

        document.getElementById("charsNoSpace").innerText = 
        text.replace(/\s/g,"").length;

        const words = text.trim() === ""

                  ?  0
                 :  text.trim().split(/\s+/).length;

       document.getElementById("charWords").innerText = words;

       const lines = text === ""
            ? 0
            : text.split(/\n/).length;

         document.getElementById("charlines").innerText = lines;
        }

       async function scanQRCode() {
        const input = 
        document.getElementById("qrSCannerInput");
        const result = 
        document.getElementById("qrResult");

        if (!input  || input.files .length === 0)
      {
        result.innerText = 
      "Please select a QR Code image.";
       return;
      }

      const file = input.files[0];
      const img = new Image();

      img.onload = function () {
        const canvas =
        document.createElement("canvas");
        const ctx =
        canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        const imageData = 
        ctx.getImageData(0, 0, canvas.width, canvas.height);

        const code =
        jsQR(imageData.data, canvas.width, canvas.height);


        if (code) {
            result.innerHTML = 
            `<a href="${code.data}"
            target="_blank">${code.data}</a>`;

        } else {
            result.innerText = "No QR Code found.";
        }
      };

      img.src =
      URL.createObjectURL(file);
    }

let voices = [];

function loadVoices() {
    voices =
    speechSynthesis.getVoices();

    const voiceSelect =
    document.getElementById("voiceSelect");
    const languageSelect =
    document.getElementById("languageSelect");

    voiceSelect.innerHTML = "";
    languageSelect.innerHTML = "";

    const languages =[];

    voices.forEach((voice, index)=> {
        const option =
        document.createElement("option");
        option.value = index;
        option.textContent = `$ {voice.name} (${voice.lang})`;

        voiceSelect.appendChild(option);

        if(!
            languages.includes(voice.lang)) {

                languages.push(voice.lang);

             const langOption =
             document.createElement("option");
             langOption.value = voice.lang;
             langOption.textContent = voice.lang;
             languageSelect.appendChild(option);

            }
        

    });
}

speechSynthesis.onvoiceschanged =
loadVoices;
loadVoices();

function speakText() {
    speechSynthesis.cancel();

    const text =
    document.getElementById("ttsText").value;

    if (text.trim() === "") {
        alert("please enter some text.");
        return;
    }

    const utterance = new
    SpeechSynthesisUtterance(text);

    const voiceIndex =
    document.getElementById("voiceSelect").value;
    utterance.voice = voices[voiceIndex];

    utterance.lang =
    document.getElementById("languageSelect").value;
    utterance.rate =
    parseFloat(document.getElementById("speed").value);
    utterance.pitch =
     parseFloat(document.getElementById("pitch").value);
    utterance.volume =
    parseFloat(document.getElementById("volume").value);

    speechSynthesis.speak(utterance);
}

function pauseSpeech() {
    speechSynthesis.pause();

}

function resumeSpeech() {
    speechSynthesis.resume();

}

function stopSpeech() {
    speechSynthesis.cancel()

}

function clearText() {
    document.getElementById("ttsText").value ="";
    speechSynthesis.cancel();
}

document.getElementById("speed").oninput = function () {

    document.getElementById("speedValue").textContent = this.value;
};

document.getElementById("pitch").oninput = function () {

    document.getElementById("pitchValue").textContent = this.value;
};

document.getElementById("volume").oninput = function() {

    document.getElementById("volumeValue").textContent = this.value;
};

function encodeBase64() {
    const text =
    document.getElementById("base64Input").value;
    document.getElementById("base64Output").value;
    btoa(unescape(encodeURIComponent(text)));
}

function decodeBase64() {
    const text =
    document.getElementById("base64Input").value;

    try {

        document.getElementById("base64Output").value =

     decodeURIComponent(escape(atob(text)));

} catch {
    alert("Invalid Base64 Text");
}

}

function copyBase64() {
    const output =
    document.getElementById("base64Output");
    output.select();
    document.execCommand("copy");
    alert("Copied!");
}

function clearBase64() {
    document.getElementById("base64Input").value = "";
    document.getElementById("base64Output").value = "";
}

function encodeURL() { 
const text =
document.getElementById("urlInput").value;

document.getElementById("urlOutput").value =

encodeURIComponent(text);
        }

        function decodeURL() {
        const text =
        document.getElementById("urlInput").value;

        try {

        document.getElementById("urlOutput").value =
        decodeURIComponent(text);
} catch{
    alert("Invalid URL Encoded Text");
    }

}

function copyURL() {
const output = 
document.getElementById("urlOutput");
output.select();
document.execCommand("copy");
alert("copied!");
}

function clearURL() {

document.getElementById("urlInput").value = "";

document.getElementById("urlOutput").value = "";
}

function formatJSON () {
    const input =
    document.getElementById("jsonInput").value;

    try {
        const obj =
        JSON.parse(input);

        document.getElementById("jsonOutput").value =
        JSON.stringify(obj, null, 4);
    } catch (e) {
        alert("Invalid JSON");
    }

}

function minifyJSON() {
    const input =
    document.getElementById("jsonInput").value;

    try {
        const obj = 
        JSON.parse(input);

        document.getElementById("jsonOutput").value =
        JSON.stringify(obj);
    } catch (e) {
         alert("Invalid JSON");
    }
    
}

function copyJSON() {
    const output =
    document.getElementById("jsonOutput");
    output.select();
    document.execCommand("copy");
    alert("Copied!");
}

function clearJSON() {
    document.getElementById("jsonInput").value = "";

    document.getElementById("jsonOutput").value = "";
}

function cropImage() {
    alert("Image Crop Tool added. Crop logic will be added later.");
}

function mergePDF() {
    alert("PDFmarger Tool added. PDF merging logic will be added later.");
}



