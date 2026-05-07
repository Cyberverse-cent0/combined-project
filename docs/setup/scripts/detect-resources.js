const os = require('os');

function detectSystemResources() {
  const totalCores = os.cpus().length;
  const totalMemoryGB = os.totalmem() / (1024 * 1024 * 1024);
  const freeMemoryGB = os.freemem() / (1024 * 1024 * 1024);
  
  // Calculate optimal instance counts based on system resources
  const websiteInstances = Math.max(2, Math.floor(totalCores * 0.8));
  const pythonWorkers = Math.max(2, Math.floor(totalCores * 0.5));
  
  // Calculate memory limits based on available RAM
  const totalInstances = websiteInstances;
  const memoryPerInstance = Math.floor((totalMemoryGB * 0.6) / totalInstances) * 1024;
  
  const resources = {
    totalCores,
    totalMemoryGB: Math.floor(totalMemoryGB),
    freeMemoryGB: Math.floor(freeMemoryGB),
    websiteInstances,
    pythonWorkers,
    memoryPerInstance: `${memoryPerInstance}M`
  };
  
  console.log('Detected System Resources:', JSON.stringify(resources, null, 2));
  return resources;
}

module.exports = { detectSystemResources };

// Run detection if called directly
if (require.main === module) {
  detectSystemResources();
}
