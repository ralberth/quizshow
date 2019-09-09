import {Enum} from 'enumify';

class ContestantRenderMode extends Enum {}
ContestantRenderMode.initEnum(["waiting", "buzzerDisabled", "buzzerEnabled"]);

export default ContestantRenderMode;
