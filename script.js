const canvas = document.getElementById('myCanvas');
            const colorpicker = document.getElementById("colorPicker");
            const canvasColor = document.getElementById("canvasColor");
            const clearButton = document.getElementById("clearButton");
            const saveButton = document.getElementById("saveButton");
            const fontsize = document.getElementById("fontSize")
            const retreiveButton = document.getElementById("retreiveButton")
            const ctx = canvas.getContext('2d');
            let isDrawing = false;
            colorpicker.addEventListener("change", (e)=>{
                ctx.strokeStyle = e.target.value;
                ctx.fillStyle = e.target.value;
            })
            canvas.addEventListener("mousedown", (e)=>{
                isDrawing = true;
                lastX = e.offsetX;
                lastY = e.offsetY;
            })

            canvas.addEventListener("mousemove", (e)=>{
                if(isDrawing){
                    ctx.beginPath();
                    ctx.moveTo(lastX, lastY);
                    ctx.lineTo(e.offsetX, e.offsetY);
                    ctx.stroke();
                    lastX = e.offsetX;
                    lastY = e.offsetY;
                }
            })
            canvas.addEventListener("mouseup" , ()=>{isDrawing = false;})

            canvasColor.addEventListener("change", (e)=>{ctx.fillStyle = e.target.value;
            ctx.fillRect(0,0,canvas.width,canvas.height)})

            fontsize.addEventListener("change", (e)=>{ctx.lineWidth = e.target.value})

            clearButton.addEventListener("click", ()=>{ctx.clearRect(0,0,canvas.width,canvas.height)})

            saveButton.addEventListener("click", ()=>{
                const dataURL = canvas.toDataURL();
                localStorage.setItem('canvasContents', dataURL)
                const link = document.createElement('a');
                link.download = 'signature.png';
                link.href = dataURL;
                link.click();
            })
            retreiveButton.addEventListener('click',()=>{
                let savedCanvas = localStorage.getItem("canvasContents")
                if(savedCanvas)
                {
                    let img = new Image();
                    img.src = savedCanvas;
                    ctx.drawImage(img,0,0)

                }
            })