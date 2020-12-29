from smarts.ultra.registry import register
from .sac.sac.policy import SACPolicy
from .ppo.ppo.policy import PPOPolicy
from smarts.core.controllers import ActionSpaceType
from ultra.baselines.agent_spec import UltraAgentSpec

register(
    locator="sac-v0",
    entry_point=lambda **kwargs:
        UltraAgentSpec(
            action_type=ActionSpaceType.Continuous,
            policy_class=SACPolicy,
            **kwargs
        )
)
register(
    locator="ppo-v0",
    entry_point=lambda **kwargs:
        UltraAgentSpec(
            action_type=ActionSpaceType.Continuous,
            policy_class=PPOPolicy,
            **kwargs
        )
)
