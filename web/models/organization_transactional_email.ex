defmodule Pomerol.OrganizationTransactionalEmail do
  use Pomerol.Web, :model

  alias Pomerol.OrganizationTransactionalEmail

  schema "organization_transactional_emails" do
    field :type, :string
    field :subject, :string
    field :body, :string
    field :footer, :string

    belongs_to :organization, Pomerol.Organization

    timestamps
  end

  def default_organization_transactional_emails() do
    [
      %{
        type: "new-quote",
        subject: "New quote: *|Quote-title|*",
        body: "Hi *|Customer-given-names|*, \n*|Your-name|* of *|Your-company-name|* has prepared the following quote for you: ",
        footer: ""
      }, %{
        type: "accepted-quote",
        subject: "Quote accepted: *|Quote-title|*",
        body: "Hi *|Customer-given-names|*, \nThank you for your acceptance.",
        footer: ""
      }, %{
        type: "first-follow-up",
        subject: "Following up: *|Quote-title|*",
        body: "Hi *|Customer-given-names|*, \nI’m happy to answer any questions you might have about the quote I prepared for you. You can ask these direct in the quote by following the link below or feel free to call me.",
        footer: ""
      }, %{
        type: "second-follow-up",
        subject: "Following up: *|Quote-title|*",
        body: "Hi *|Customer-given-names|*, \nThis is just a quick reminder about the quote I prepared for you recently.  If you have any questions I’d be happy to help. You can ask me anything direct in the quote by clicking the link below. Or feel free to call me. ",
        footer: ""
      }
    ] |> Enum.map(fn (params) -> changeset(%OrganizationTransactionalEmail{}, params) end)
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:type, :subject, :body, :footer])
    |> validate_required([:type, :subject])
    |> validate_inclusion(:type, Pomerol.SupportedEnums.transactional_emails)
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
