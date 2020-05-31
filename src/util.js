
function count(line) {
    return (line.match(/\t/g) || []).length
}

function text2Json(lines) {
    const obj = {}
    obj['name'] = lines[0].trim()
    if(lines.length > 1) {
        obj['children'] = []
    } else {
        return obj
    }

    const childCount = count(lines[0]) + 1
    let arr = []
    for (let i = 1; i < lines.length; i++) {
        if(childCount === count(lines[i])) {
            if(arr.length) {
                obj.children.push(arr)
                arr = []
            }
        }
        arr.push(lines[i])
    }
    if(arr.length !== 0) {
        obj.children.push(arr)
    }
    for (let i = 0; i < obj.children.length; i++) {
        obj.children[i] = text2Json(obj.children[i])
    }
    return obj
}

function recursion(root, arr, prefix, layer) {
    arr.push(layer + root.name)
    if(layer) {
        prefix += root.name + '-'
    }
    layer += '\t'
    if(root.children && root.children.length > 0) {
        for(let i = 0; i < root.children.length; i++) {
            recursion(root.children[i], arr, prefix, layer)
        }
    } else {
        arr.push(layer + prefix.substring(0, prefix.length - 1))
    }
}

const json2Text = function(root) {
    let arr = []
    recursion(root, arr, '', '')
    return arr.join('\n')
}



export function xmindTranslate(value) {
    const lines = value.split('\n')
    const newLines = lines.filter((line) => !line.includes('-'))
    const json = text2Json(newLines)
    const result = json2Text(json)
    return result
}









