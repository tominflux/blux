const path = require("path")

//
//Taken From...
//https://gist.github.com/hagemann/382adfc57adbd5af078dc93feef01fe1
//
function slugify(string) {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')
    return string.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
}
//
function slugifyFilename(filename) {
    const split = filename.split('.')
    const extension = (split.length > 1) ? "." + split.pop() : ""
    const name = split.pop()
    const slugifiedName = slugify(name)
    const slugifiedFilename = `${slugifiedName}${extension}`
    return slugifiedFilename
}
//
function slugifyFilepath(filepath) {
    const filename = path.basename(filepath)
    const parentDirectory = path.dirname(filepath)
    const slugifiedFilename = slugifyFilename(filename)
    const slugifiedFilepath = path.join(
        parentDirectory, slugifiedFilename
    )
    return slugifiedFilepath
}


exports.slugify = slugify
exports.slugifyFilename = slugifyFilename
exports.slugifyFilepath = slugifyFilepath