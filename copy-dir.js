const fs = require('fs-extra');

const listFolderCopy = [
  {
    sourceDirectory: "public",
    targerDirectory: "dist/public"
  },
  {
    sourceDirectory: "views",
    targerDirectory: "dist/views"
  }
]

listFolderCopy.forEach(item => {
  fs.copy(item.sourceDirectory, item.targerDirectory, err => {
    if (err) {
      console.error(err)
    }
    else {
      console.log('success!')
    }
  })
})