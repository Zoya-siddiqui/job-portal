import {config} from 'dotenv'
import express from 'express'

const app = express();
config()

export {app}