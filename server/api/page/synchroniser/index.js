

let _isSaving = false

const updateBegan = () => {
    _isSaving = true
}

const updateEnded = () => {
    _isSaving = false
}

const isSaving = () => _isSaving


///////////

exports.updateBegan = updateBegan
exports.updateEnded = updateEnded
exports.isSaving = isSaving