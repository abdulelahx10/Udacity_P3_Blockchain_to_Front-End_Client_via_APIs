//const SHA256 = require('crypto-js/sha256');
const Joi = require('joi');
const Block = require('./Block.js');
const BlockChain = require('./Blockchain.js');

/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {

    /**
     * Constructor to create a new BlockController, you need to initialize here all your endpoints
     * @param {*} server 
     */
    constructor(server) {
        this.server = server;
        //this.blocks = [];
        this.myBlockChain = new BlockChain.Blockchain();
        //this.initializeMockData();
        this.getBlockByIndex();
        this.postNewBlock();
    }

    /**
     * Implement a GET Endpoint to retrieve a block by index, url: "/block/:index"
     */
    getBlockByIndex() {
        this.server.route({
            method: 'GET',
            path: '/block/{index}',
            handler: async (request, h) => {
                let height = await this.myBlockChain.getBlockHeight();
                if (request.params.index >= height) {
                    return 'Block does not exist!';
                }
                return await this.myBlockChain.getBlock(request.params.index);
            }
        });
    }

    /**
     * Implement a POST Endpoint to add a new Block, url: "/block"
     */
    postNewBlock() {
        this.server.route({
            method: 'POST',
            path: '/block',
            handler: async (request, h) => {
                let block = new Block.Block(request.payload.body);
                return await this.myBlockChain.addBlock(block);
            },
            options: {
                validate: {
                    payload: {
                        body: Joi.string().required()
                    }
                }
            }
        });
    }

    /**
     * Help method to inizialized Mock dataset, adds 5 test blocks to the blocks array
     */
    initializeMockData() {
        if (this.blocks.length === 0) {
            let blockAux = new BlockClass.Block(`First block in the chain - Genesis block`);
            blockAux.height = 0;
            blockAux.hash = SHA256(JSON.stringify(blockAux)).toString();
            this.blocks.push(blockAux);

            for (let index = 1; index < 5; index++) {
                let blockAux = new BlockClass.Block(`Test Data #${index}`);
                blockAux.height = index;
                blockAux.hash = SHA256(JSON.stringify(blockAux)).toString();
                blockAux.previousBlockHash = this.blocks[index - 1].hash;
                this.blocks.push(blockAux);
            }
        }
    }


}

/**
 * Exporting the BlockController class
 * @param {*} server 
 */
module.exports = (server) => {
    return new BlockController(server);
}