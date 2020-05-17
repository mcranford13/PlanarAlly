from typing import Any, Dict

import auth
from app import app, logger, sio
from models import PlayerRoom, Shape
from models.shape.access import has_ownership
from state.game import game_state


@sio.on("Shape.Options.Invisible.Set", namespace="/planarally")
@auth.login_required(app, sio)
async def add_shape(sid: int, data: Dict[str, Any]):
    pr: PlayerRoom = game_state.get(sid)

    try:
        shape: Shape = Shape.get(uuid=data["shape"])
    except Shape.DoesNotExist as exc:
        logger.warning(
            f"Attempt to update invisibility of unknown shape by {pr.player.name} [{data['shape']}]"
        )
        raise exc

    if not has_ownership(shape, pr):
        logger.warning(
            f"{pr.player.name} attempted to change invisibility of a shape it does not own"
        )
        return

    shape.is_invisible = data["is_invisible"]
    shape.save()

    await sio.emit(
        "Shape.Options.Invisible.Set",
        data,
        room=pr.active_location.get_path(),
        namespace="/planarally",
    )
