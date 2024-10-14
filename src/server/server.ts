import dgram, { Socket } from 'node:dgram'
import dnsPacket from 'dns-packet';
import dns from 'node:dns/promises'

class Server {
    private server: Socket
    private port: number
    constructor() {
        this.server = dgram.createSocket('udp4')
        this.port = 5353
        this.initServer()
        this.handleSocket()
    }
    private initServer(): void {
        this.server.bind(this.port, () => {
            console.log(`Server is running on port ${this.port}`)
        })
    }
    private handleSocket(): void {
        this.server.on("message", async (data, rinfo) => {
            try {
                const request: dnsPacket.DecodedPacket = dnsPacket.decode(data)
                if (!request.questions || request.questions.length === 0) {
                    throw new Error("No questions in DNS request")
                }
                const info = await dns.resolveAny(request.questions[0].name).catch((err) => {
                    throw new Error(err)
                })
                if (!info || info.length === 0) {
                    throw new Error(`No records found`);
                }
                const response = info.map((record) => {
                    if ('address' in record) {
                        return {
                            type: record.type,
                            class: "IN",
                            name: request.questions ? request.questions[0].name : [],
                            data: record.address
                        }
                    }
                    return null
                }) as dnsPacket.Answer[];
                if (response.length === 0) {
                    throw new Error("No valid answers found for the DNS query");
                }
                const ans = dnsPacket.encode({
                    type: request.type,
                    id: request.id,
                    flags: dnsPacket.AUTHORITATIVE_ANSWER,
                    questions: request.questions,
                    answers: response,
                })
                this.server.send(ans, rinfo.port, rinfo.address);
            } catch (error) {
                if (error instanceof Error)
                    this.server.send(error.message, rinfo.port, rinfo.address)
            }
        })
    }
}
const server = new Server()