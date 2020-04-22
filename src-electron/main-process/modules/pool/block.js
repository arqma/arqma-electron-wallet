import { randomBytes } from "crypto"

export class Block {
  constructor(pool, template) {

      this.pool = pool
      this.template = template
      this.seed_hash = template.seed_hash
      this.next_seed_hash = template.next_seed_hash
      this.blockhashing_blob = template.blocktemplate_blob
      this.extra_nonce = 0
      this.height = template.height
      this.difficulty = template.difficulty
      this.address = pool.config.mining.address

      this.buffer = Buffer.from(template.blocktemplate_blob, "hex")

      this.extra_nonce = randomBytes(1).readUInt8() % 32
      randomBytes(4).copy(this.buffer, template.reserved_offset + 4)

    }
    newBlob() {
        this.extra_nonce++
         this.writeExtraNonce(this.extra_nonce)
        return this.convertBlob()
    }
    convertBlob() {
        try {
            return this.pool.core_bridge.convert_blob(this.buffer.toString("hex"))
        } catch(e) {
            return false
        }
    }
    writeExtraNonce(extra_nonce, buffer=false) {
        if(!buffer) {
            buffer = this.buffer
        }
        buffer.writeUInt32BE(extra_nonce, this.template.reserved_offset)
        return buffer
    }
}
