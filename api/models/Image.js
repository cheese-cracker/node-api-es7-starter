'use strict'
import mongoose from 'mongoose'

const imageSchema = {
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
}

const ImageModel = mongoose.Model(imageSchema)
export default ImageModel;
