const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0YzQ3ODAxNi1jM2NkLTRiN2QtYTViYi0zYjc0YWJiYTM0YWQiLCJlbWFpbCI6Imxpc2EuY2hhcnVlbEBlZHUuZGV2aW5jaS5mciIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI1ZWIwNmIyMjk5ZWQ1ZGY1NDMxZiIsInNjb3BlZEtleVNlY3JldCI6ImFiZDgyMmI0ZDIwZmY3MDVlYjE4NjMwZmEyMDM1NjQ4ZDNhN2E3OGMzYTkyMWQxZWZmOTc4NGNjMGRhMGNkZmYiLCJpYXQiOjE3MDcyMjYwMTZ9.a78q9RU6_oZperORVYJuz3nc9jFo5v4-x925WQWLLeQ"

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "IPFS-command.png";
    
    const file = fs.createReadStream(src)
    formData.append('file', file)
    
    const pinataMetadata = JSON.stringify({
      name: 'IPFS-command_Lisa',
    });
    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
}
pinFileToIPFS()
