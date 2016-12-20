defmodule Pomerol.OrganizationService do
  use Pomerol.Web, :service
  # TODO : to be refactored and moved to controller

  def insert(conn, changeset, params) do
    Multi.new
    |> Multi.insert(:organization, changeset)
  end
end
