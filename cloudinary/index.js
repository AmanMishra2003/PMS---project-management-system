const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_APIKEY, 
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: (req,file)=>{
            if(file.fieldname==='image'){
                return 'PMS/project'
            }else if(file.fieldname==='task'){
                return 'PMS/assignedTasks'
            }
      },
    },
    allowedFormat : ['png','jpeg','jpg','pdf']
  });

const storageRawFiles = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: (req,file)=>{
            if(file.fieldname==='submission'){
                return 'PMS/submission'
            }
      },
      resource_type: 'raw', 
    },
    allowedFormat : ['pdf']
  });


  module.exports = {
    cloudinary,
    storageRawFiles,
    storage
  }