import {DefaultEventManager} from "./impl/DefaultEventManager";
import {BlankStage} from "./impl/BlankStage";
import {CanvasDrawingOutput} from "./impl/CanvasDrawingOutput";
import {Ticker} from "./api/Ticker";
import {Game} from "./api/Game";
import {DefaultStageManager} from "./impl/DefaultStageManager";

const appEventManager = new DefaultEventManager();
const stageEventManager = new DefaultEventManager();
const rootStage = new BlankStage(new CanvasDrawingOutput().setWidth(800).setHeight(400), stageEventManager, new Ticker(stageEventManager));
const stageManager = new DefaultStageManager(appEventManager, rootStage);

const app = new Game(new CanvasDrawingOutput().setHeight(400).setWidth(800), appEventManager, stageManager, new Ticker(appEventManager));
app.mount(document.getElementById('root'));
app.start();
