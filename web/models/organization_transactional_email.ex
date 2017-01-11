defmodule Pomerol.OrganizationTransactionalEmail do
  use Pomerol.Web, :model

  schema "organization_transactional_emails" do
    field :type, :string
    field :subject, :string
    field :body, :string
    field :footer, :string

    belongs_to :organization, Pomerol.Organization

    timestamps
  end

  def create_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:type, :subject, :body, :footer, :organization_id])
    |> validate_required([:type, :subject, :organization_id])
    |> validate_inclusion(:type, Pomerol.SupportedEnums.transactional_emails)
  end

  def update_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:subject, :body, :footer])
    |> validate_required([:subject])
  end

end
