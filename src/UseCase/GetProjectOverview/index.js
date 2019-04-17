export default class GetProjectOverview {
  constructor({ projectGateway }) {
    this.projectGateway = projectGateway;
  }

  async execute(presenter, { projectId }) {
    let response = await this.projectGateway.overview({ projectId });

    if (response.success) {
      let overview = response.overview;
      presenter.presentOverview({
        name: overview.name,
        type: overview.type,
        status: overview.status,
        data: overview.data,
        baselines: overview.baselines,
        claims: overview.claims,
        returns: overview.returns
      });
    } else {
      presenter.presentFailure();
    }
  }
}
