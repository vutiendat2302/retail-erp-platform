import time
import threading

class SnowflakeGenerator:
    def __init__(self, datacenter=1, worker=1):
        self.datacenter = datacenter
        self.worker = worker
        self.sequence = 0
        self.last_timestamp = -1
        self.lock = threading.Lock()

    def _timestamp(self):
        return int(time.time() * 1000)

    def generate(self):
        with self.lock:
            timestamp = self._timestamp()

            if timestamp == self.last_timestamp:
                self.sequence = (self.sequence + 1) & 0xFFF
                if self.sequence == 0:
                    while timestamp <= self.last_timestamp:
                        timestamp = self._timestamp()
            else:
                self.sequence = 0

            self.last_timestamp = timestamp

            snowflake_id = ((timestamp & 0x1FFFFFFFFFF) << 22) | (self.datacenter << 17) | (self.worker << 12) | self.sequence
            return snowflake_id
