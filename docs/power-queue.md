PowerQueue(\[options\], \[options.filo=false\], \[options.isPaused=false\], \[options.autostart=true\], \[options.name="Queue"\], \[options.maxProcessing=1\], \[options.maxFailures=5\])
----------------------------------------------------------------------------------------------------
Creates an instance of a power queue



**Parameters**

**[options]**:  *object*,  Settings

**[options.filo=false]**:  *boolean*,  Make it a first in last out queue

**[options.isPaused=false]**:  *boolean*,  Set queue paused

**[options.autostart=true]**:  *boolean*,  May adding a task start the queue

**[options.name="Queue"]**:  *string*,  Name of the queue

**[options.maxProcessing=1]**:  *number*,  Limit of simultanous running tasks

**[options.maxFailures=5]**:  *number*,  Limit retries of failed tasks

