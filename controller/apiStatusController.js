const { connectToRunpod } = require("../config/runpodSocket");


exports.statusController = async (req, res) => {

    const jobId = req.params.id;

    try {
        // Step 1: Start the RunPod server
        const statusRes = await fetch(`https://api.runpod.ai/v2/j7x8780d4l2h7s/status/${jobId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer NUKS7FDSZL0Q83OH1JDZ4U4C55PHXTAVY7C97YMI'
            }
        });

        const statusData = await statusRes.json();
        let status = statusData?.status;
        const url = statusData?.output;
        if (statusData.error) {
            status = statusData?.error
        }
        console.log(`Polling... Status: ${status}, wsUrl.... ${url}`);

        if (status === 'IN_PROGRESS') {
            connectToRunpod(url);
          res.json({
            message: "Server is ready status Id",
            url: url,
          })
            //setWsUrl(url); // Assuming setWsUrl is in your React state
            console.log('Server is ready. WebSocket URL:', url);
        }

        else if (status === 'FAILED') {
            console.error('Job failed:', statusData);
           return res.json({
            message: "Failed status id",
            url: ""
           })
            
        }
        else if (status === "COMPLETED") {
             return res.json({
                message: "completed statusid",
                url:""
             })                                                                         
           // alert("JobId not available CLick on Start-Server ");
        }
        else if (status === "CANCELLED") {
            return res.json({
                message: "cancelled",
                url:""
            })
           // alert("JobId are not available Click on Start-Server");
        }
        else if (status === "request does not exist") {
           return res.json({
            message: "request doesnot exist",
            url:"",
           })
            //alert("JobId are not available Click on Start-Server");
        }

    } catch (error) {
        return res.json({
            message: "Failed to start-server st",
            error: error,
        })
        //console.error('Failed to start server job:', error);
        
    }

};
