const text = document.querySelector("textarea")
const positionSelect = document.querySelector(".position")
const keywordInput = document.querySelector(".keyword")
const separatorSelect = document.querySelector(".separator")
const separatorInput = document.querySelector(".separator-input")
const wordCount = document.querySelector(".word-count")
const alert = document.querySelector(".alert")

const filterButt = document.querySelector(".filter")
const clearButt = document.querySelector(".clear")
const copyButt = document.querySelector(".copy")



filterButt.addEventListener("click", ()=>{
    const keyword = keywordInput.value
    
    const startsWithPattern = new RegExp(`^`+keyword, 'igm'); // Starts with
    const endsWithPattern = new RegExp(keyword+`$`, 'igm'); // Ends with whole word
    const includesPattern = new RegExp(`.*`+keyword+`.*`, 'igm'); // Includes

    const separator = separatorSelect.value
    const position = positionSelect.value
    var uncleaned_text = text.value
    uncleaned_text = uncleaned_text.split(/\s+/)
    
    var filteredTexts = []
    



    if(text.value === ""){
        alert.textContent = "There is nothing to filter"
        alert.classList.add("error")
        alert.classList.remove("alert-active")
        alert.classList.add("alert-active")

        setTimeout(()=>{
            alert.classList.remove("alert-active")
            alert.classList.remove("error")
        }, 5000)
        wordCount.value = 0
    }else if(keyword === ""){
        alert.textContent = "Please input a keyword"
        alert.classList.remove("alert-active")
        alert.classList.remove("error")
        alert.classList.add("error")
        alert.classList.add("alert-active")

        setTimeout(()=>{
            alert.classList.remove("alert-active")
            alert.classList.remove("error")
        }, 5000)
        wordCount.value = 0
    }else{

        // filtering
        uncleaned_text.forEach(word => {
            if(position === "start" && word.match(startsWithPattern)){
                filteredTexts.push(word)
        
            }else if(position === "end" && word.match(endsWithPattern)){
                filteredTexts.push(word)
        
            }else if(position === "include" &&  word.match(includesPattern)){
                filteredTexts.push(word)
            }
        });
        
        // separator
        console.log(filteredTexts)
        var sep = ""
        if(separatorInput.value == ""){
            if(separator === "comma"){
                sep = ", "
            }else if(separator === "new-line"){
                sep = "\n"
            }else if(separator === "space"){
                sep = " "
            }
        }else{
            sep = separatorInput.value
        }


        if(filteredTexts.length === 1){
            alert.textContent = filteredTexts.length + " word matches the filter"
            text.value = filteredTexts
        }else if(filteredTexts.length === 0){
                alert.textContent = "Sorry no match was found"
                alert.classList.remove("alert-active")
                alert.classList.add("error")
                alert.classList.add("alert-active")

                setTimeout(()=>{
                    alert.classList.remove("alert-active")
                    alert.classList.remove("error")
                }, 5000)
        }else{
            alert.textContent = filteredTexts.length + " words matches the filter"
            wordCount.value = filteredTexts.length
            filteredTexts = filteredTexts.join(sep)
            text.value = filteredTexts
        }

        alert.classList.remove("alert-active")
        alert.classList.add("alert-active")

        setTimeout(()=>{
            alert.classList.remove("alert-active")
        }, 5000)

        
        

        
    }

    

    
    
})



clearButt.addEventListener("click", ()=>{
    text.value = ""
})



copyButt.addEventListener("click", ()=>{
    text.select()
    navigator.clipboard.writeText(text.value)
    .then(()=>{
        alert.textContent = "Copied to clipboard"
        alert.classList.remove("alert-active")
        alert.classList.add("alert-active")

        setTimeout(()=>{
            alert.classList.remove("alert-active")
        }, 5000)
    })
    .catch(()=>{
        alert.textContent = "Unable to copy to clipboard"
        alert.classList.remove("alert-active")
        alert.classList.remove("error")
        alert.classList.add("error")
        alert.classList.add("alert-active")

        setTimeout(()=>{
            alert.classList.remove("alert-active")
            alert.classList.remove("error")
        }, 5000)
    })
    
})