exports.jobIdController = async (req, res) => {
      const jobPayload = {
      input: {
        job_type: 'start_server',
        config: {
          vad_enabled: true,
          vad_threshold: 0.7,
          timeout_minutes: 5,
          client_timeout_minutes: 2
        }
      }
    };

    try {
        // Step 1: Start the RunPod server
    
            const startRes = await fetch('https://api.runpod.ai/v2/j7x8780d4l2h7s/run', {
                method: 'POST',
                headers: {
                     'Content-Type': 'application/json',
                    'Authorization': 'Bearer NUKS7FDSZL0Q83OH1JDZ4U4C55PHXTAVY7C97YMI'
                },
                body: JSON.stringify(jobPayload)
            });

            const startData = await startRes.json();
            const jobId = startData?.id;

            //localStorage.setItem("jobId", `${jobId}`);
            if (!jobId) {
                res.json({
                    message: "Failed to get job Id",
                    jobId: ""
                });
                console.error('Failed to get job ID:', startData);
                return;
            } else if (jobId) {
                res.json({
                    message: "JobId Create",
                    jobId: jobId,
                })
                console.log("jobId75 inside runpod api", jobId);
                //setJobIdData(jobId);
            }
        

    } catch (error) {
        res.json({
            message: "Failed to start-server",
            error: error,
        })
        console.error('Failed to start server job:', error);
        return;
    }

};
