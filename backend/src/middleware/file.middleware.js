import multer from "multer"

const uploadMiddleware = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 3 * 1024 * 1024,
    },
})

export const upload = uploadMiddleware.single("resume")