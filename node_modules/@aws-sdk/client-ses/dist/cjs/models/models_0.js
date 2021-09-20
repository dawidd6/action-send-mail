"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomVerificationEmailInvalidContentException = exports.CreateCustomVerificationEmailTemplateRequest = exports.TrackingOptionsAlreadyExistsException = exports.InvalidTrackingOptionsException = exports.CreateConfigurationSetTrackingOptionsResponse = exports.CreateConfigurationSetTrackingOptionsRequest = exports.TrackingOptions = exports.InvalidSNSDestinationException = exports.InvalidFirehoseDestinationException = exports.InvalidCloudWatchDestinationException = exports.EventDestinationAlreadyExistsException = exports.CreateConfigurationSetEventDestinationResponse = exports.CreateConfigurationSetEventDestinationRequest = exports.EventDestination = exports.SNSDestination = exports.EventType = exports.KinesisFirehoseDestination = exports.InvalidConfigurationSetException = exports.CreateConfigurationSetResponse = exports.CreateConfigurationSetRequest = exports.ConfigurationSetSendingPausedException = exports.ConfigurationSetDoesNotExistException = exports.ConfigurationSetAttribute = exports.ConfigurationSetAlreadyExistsException = exports.ConfigurationSet = exports.CloudWatchDestination = exports.CloudWatchDimensionConfiguration = exports.DimensionValueSource = exports.RuleSetDoesNotExistException = exports.LimitExceededException = exports.CloneReceiptRuleSetResponse = exports.CloneReceiptRuleSetRequest = exports.CannotDeleteException = exports.BulkEmailDestinationStatus = exports.BulkEmailStatus = exports.BulkEmailDestination = exports.MessageTag = exports.Destination = exports.BouncedRecipientInfo = exports.RecipientDsnFields = exports.ExtensionField = exports.DsnAction = exports.BounceType = exports.BounceAction = exports.Body = exports.Content = exports.BehaviorOnMXFailure = exports.AlreadyExistsException = exports.AddHeaderAction = exports.AccountSendingPausedException = void 0;
exports.DeleteReceiptRuleSetRequest = exports.DeleteReceiptRuleResponse = exports.DeleteReceiptRuleRequest = exports.DeleteReceiptFilterResponse = exports.DeleteReceiptFilterRequest = exports.DeleteIdentityPolicyResponse = exports.DeleteIdentityPolicyRequest = exports.DeleteIdentityResponse = exports.DeleteIdentityRequest = exports.DeleteCustomVerificationEmailTemplateRequest = exports.TrackingOptionsDoesNotExistException = exports.DeleteConfigurationSetTrackingOptionsResponse = exports.DeleteConfigurationSetTrackingOptionsRequest = exports.EventDestinationDoesNotExistException = exports.DeleteConfigurationSetEventDestinationResponse = exports.DeleteConfigurationSetEventDestinationRequest = exports.DeleteConfigurationSetResponse = exports.DeleteConfigurationSetRequest = exports.CustomVerificationEmailTemplateDoesNotExistException = exports.CustomVerificationEmailTemplate = exports.CustomMailFromStatus = exports.InvalidTemplateException = exports.CreateTemplateResponse = exports.CreateTemplateRequest = exports.Template = exports.CreateReceiptRuleSetResponse = exports.CreateReceiptRuleSetRequest = exports.RuleDoesNotExistException = exports.InvalidSnsTopicException = exports.InvalidS3ConfigurationException = exports.InvalidLambdaFunctionException = exports.CreateReceiptRuleResponse = exports.CreateReceiptRuleRequest = exports.ReceiptRule = exports.TlsPolicy = exports.ReceiptAction = exports.WorkmailAction = exports.StopAction = exports.StopScope = exports.SNSAction = exports.SNSActionEncoding = exports.S3Action = exports.LambdaAction = exports.CreateReceiptFilterResponse = exports.CreateReceiptFilterRequest = exports.ReceiptFilter = exports.ReceiptIpFilter = exports.ReceiptFilterPolicy = exports.FromEmailAddressNotVerifiedException = exports.CustomVerificationEmailTemplateAlreadyExistsException = void 0;
exports.ListReceiptFiltersRequest = exports.ListIdentityPoliciesResponse = exports.ListIdentityPoliciesRequest = exports.ListIdentitiesResponse = exports.ListIdentitiesRequest = exports.ListCustomVerificationEmailTemplatesResponse = exports.ListCustomVerificationEmailTemplatesRequest = exports.ListConfigurationSetsResponse = exports.ListConfigurationSetsRequest = exports.InvalidRenderingParameterException = exports.InvalidPolicyException = exports.InvalidDeliveryOptionsException = exports.TemplateDoesNotExistException = exports.GetTemplateResponse = exports.GetTemplateRequest = exports.GetSendStatisticsResponse = exports.SendDataPoint = exports.GetSendQuotaResponse = exports.GetIdentityVerificationAttributesResponse = exports.IdentityVerificationAttributes = exports.GetIdentityVerificationAttributesRequest = exports.GetIdentityPoliciesResponse = exports.GetIdentityPoliciesRequest = exports.GetIdentityNotificationAttributesResponse = exports.IdentityNotificationAttributes = exports.GetIdentityNotificationAttributesRequest = exports.GetIdentityMailFromDomainAttributesResponse = exports.IdentityMailFromDomainAttributes = exports.GetIdentityMailFromDomainAttributesRequest = exports.GetIdentityDkimAttributesResponse = exports.GetIdentityDkimAttributesRequest = exports.GetCustomVerificationEmailTemplateResponse = exports.GetCustomVerificationEmailTemplateRequest = exports.GetAccountSendingEnabledResponse = exports.IdentityDkimAttributes = exports.DescribeReceiptRuleSetResponse = exports.DescribeReceiptRuleSetRequest = exports.DescribeReceiptRuleResponse = exports.DescribeReceiptRuleRequest = exports.DescribeConfigurationSetResponse = exports.ReputationOptions = exports.DescribeConfigurationSetRequest = exports.DescribeActiveReceiptRuleSetResponse = exports.ReceiptRuleSetMetadata = exports.DescribeActiveReceiptRuleSetRequest = exports.DeliveryOptions = exports.DeleteVerifiedEmailAddressRequest = exports.DeleteTemplateResponse = exports.DeleteTemplateRequest = exports.DeleteReceiptRuleSetResponse = void 0;
exports.UpdateConfigurationSetEventDestinationRequest = exports.UpdateAccountSendingEnabledRequest = exports.TestRenderTemplateResponse = exports.TestRenderTemplateRequest = exports.SetReceiptRulePositionResponse = exports.SetReceiptRulePositionRequest = exports.SetIdentityNotificationTopicResponse = exports.SetIdentityNotificationTopicRequest = exports.SetIdentityMailFromDomainResponse = exports.SetIdentityMailFromDomainRequest = exports.SetIdentityHeadersInNotificationsEnabledResponse = exports.SetIdentityHeadersInNotificationsEnabledRequest = exports.SetIdentityFeedbackForwardingEnabledResponse = exports.SetIdentityFeedbackForwardingEnabledRequest = exports.SetIdentityDkimEnabledResponse = exports.SetIdentityDkimEnabledRequest = exports.SetActiveReceiptRuleSetResponse = exports.SetActiveReceiptRuleSetRequest = exports.SendTemplatedEmailResponse = exports.SendTemplatedEmailRequest = exports.SendRawEmailResponse = exports.SendRawEmailRequest = exports.SendEmailResponse = exports.SendEmailRequest = exports.SendCustomVerificationEmailResponse = exports.SendCustomVerificationEmailRequest = exports.SendBulkTemplatedEmailResponse = exports.SendBulkTemplatedEmailRequest = exports.SendBounceResponse = exports.SendBounceRequest = exports.ReorderReceiptRuleSetResponse = exports.ReorderReceiptRuleSetRequest = exports.RawMessage = exports.PutIdentityPolicyResponse = exports.PutIdentityPolicyRequest = exports.PutConfigurationSetDeliveryOptionsResponse = exports.PutConfigurationSetDeliveryOptionsRequest = exports.ProductionAccessNotGrantedException = exports.MissingRenderingAttributeException = exports.MessageRejected = exports.MessageDsn = exports.Message = exports.MailFromDomainNotVerifiedException = exports.ListVerifiedEmailAddressesResponse = exports.ListTemplatesResponse = exports.TemplateMetadata = exports.ListTemplatesRequest = exports.ListReceiptRuleSetsResponse = exports.ListReceiptRuleSetsRequest = exports.ListReceiptFiltersResponse = void 0;
exports.VerifyEmailIdentityResponse = exports.VerifyEmailIdentityRequest = exports.VerifyEmailAddressRequest = exports.VerifyDomainIdentityResponse = exports.VerifyDomainIdentityRequest = exports.VerifyDomainDkimResponse = exports.VerifyDomainDkimRequest = exports.UpdateTemplateResponse = exports.UpdateTemplateRequest = exports.UpdateReceiptRuleResponse = exports.UpdateReceiptRuleRequest = exports.UpdateCustomVerificationEmailTemplateRequest = exports.UpdateConfigurationSetTrackingOptionsResponse = exports.UpdateConfigurationSetTrackingOptionsRequest = exports.UpdateConfigurationSetSendingEnabledRequest = exports.UpdateConfigurationSetReputationMetricsEnabledRequest = exports.UpdateConfigurationSetEventDestinationResponse = void 0;
var AccountSendingPausedException;
(function (AccountSendingPausedException) {
    /**
     * @internal
     */
    AccountSendingPausedException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AccountSendingPausedException = exports.AccountSendingPausedException || (exports.AccountSendingPausedException = {}));
var AddHeaderAction;
(function (AddHeaderAction) {
    /**
     * @internal
     */
    AddHeaderAction.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AddHeaderAction = exports.AddHeaderAction || (exports.AddHeaderAction = {}));
var AlreadyExistsException;
(function (AlreadyExistsException) {
    /**
     * @internal
     */
    AlreadyExistsException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AlreadyExistsException = exports.AlreadyExistsException || (exports.AlreadyExistsException = {}));
var BehaviorOnMXFailure;
(function (BehaviorOnMXFailure) {
    BehaviorOnMXFailure["RejectMessage"] = "RejectMessage";
    BehaviorOnMXFailure["UseDefaultValue"] = "UseDefaultValue";
})(BehaviorOnMXFailure = exports.BehaviorOnMXFailure || (exports.BehaviorOnMXFailure = {}));
var Content;
(function (Content) {
    /**
     * @internal
     */
    Content.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Content = exports.Content || (exports.Content = {}));
var Body;
(function (Body) {
    /**
     * @internal
     */
    Body.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Body = exports.Body || (exports.Body = {}));
var BounceAction;
(function (BounceAction) {
    /**
     * @internal
     */
    BounceAction.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BounceAction = exports.BounceAction || (exports.BounceAction = {}));
var BounceType;
(function (BounceType) {
    BounceType["ContentRejected"] = "ContentRejected";
    BounceType["DoesNotExist"] = "DoesNotExist";
    BounceType["ExceededQuota"] = "ExceededQuota";
    BounceType["MessageTooLarge"] = "MessageTooLarge";
    BounceType["TemporaryFailure"] = "TemporaryFailure";
    BounceType["Undefined"] = "Undefined";
})(BounceType = exports.BounceType || (exports.BounceType = {}));
var DsnAction;
(function (DsnAction) {
    DsnAction["DELAYED"] = "delayed";
    DsnAction["DELIVERED"] = "delivered";
    DsnAction["EXPANDED"] = "expanded";
    DsnAction["FAILED"] = "failed";
    DsnAction["RELAYED"] = "relayed";
})(DsnAction = exports.DsnAction || (exports.DsnAction = {}));
var ExtensionField;
(function (ExtensionField) {
    /**
     * @internal
     */
    ExtensionField.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ExtensionField = exports.ExtensionField || (exports.ExtensionField = {}));
var RecipientDsnFields;
(function (RecipientDsnFields) {
    /**
     * @internal
     */
    RecipientDsnFields.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RecipientDsnFields = exports.RecipientDsnFields || (exports.RecipientDsnFields = {}));
var BouncedRecipientInfo;
(function (BouncedRecipientInfo) {
    /**
     * @internal
     */
    BouncedRecipientInfo.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BouncedRecipientInfo = exports.BouncedRecipientInfo || (exports.BouncedRecipientInfo = {}));
var Destination;
(function (Destination) {
    /**
     * @internal
     */
    Destination.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Destination = exports.Destination || (exports.Destination = {}));
var MessageTag;
(function (MessageTag) {
    /**
     * @internal
     */
    MessageTag.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(MessageTag = exports.MessageTag || (exports.MessageTag = {}));
var BulkEmailDestination;
(function (BulkEmailDestination) {
    /**
     * @internal
     */
    BulkEmailDestination.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BulkEmailDestination = exports.BulkEmailDestination || (exports.BulkEmailDestination = {}));
var BulkEmailStatus;
(function (BulkEmailStatus) {
    BulkEmailStatus["AccountDailyQuotaExceeded"] = "AccountDailyQuotaExceeded";
    BulkEmailStatus["AccountSendingPaused"] = "AccountSendingPaused";
    BulkEmailStatus["AccountSuspended"] = "AccountSuspended";
    BulkEmailStatus["AccountThrottled"] = "AccountThrottled";
    BulkEmailStatus["ConfigurationSetDoesNotExist"] = "ConfigurationSetDoesNotExist";
    BulkEmailStatus["ConfigurationSetSendingPaused"] = "ConfigurationSetSendingPaused";
    BulkEmailStatus["Failed"] = "Failed";
    BulkEmailStatus["InvalidParameterValue"] = "InvalidParameterValue";
    BulkEmailStatus["InvalidSendingPoolName"] = "InvalidSendingPoolName";
    BulkEmailStatus["MailFromDomainNotVerified"] = "MailFromDomainNotVerified";
    BulkEmailStatus["MessageRejected"] = "MessageRejected";
    BulkEmailStatus["Success"] = "Success";
    BulkEmailStatus["TemplateDoesNotExist"] = "TemplateDoesNotExist";
    BulkEmailStatus["TransientFailure"] = "TransientFailure";
})(BulkEmailStatus = exports.BulkEmailStatus || (exports.BulkEmailStatus = {}));
var BulkEmailDestinationStatus;
(function (BulkEmailDestinationStatus) {
    /**
     * @internal
     */
    BulkEmailDestinationStatus.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BulkEmailDestinationStatus = exports.BulkEmailDestinationStatus || (exports.BulkEmailDestinationStatus = {}));
var CannotDeleteException;
(function (CannotDeleteException) {
    /**
     * @internal
     */
    CannotDeleteException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CannotDeleteException = exports.CannotDeleteException || (exports.CannotDeleteException = {}));
var CloneReceiptRuleSetRequest;
(function (CloneReceiptRuleSetRequest) {
    /**
     * @internal
     */
    CloneReceiptRuleSetRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CloneReceiptRuleSetRequest = exports.CloneReceiptRuleSetRequest || (exports.CloneReceiptRuleSetRequest = {}));
var CloneReceiptRuleSetResponse;
(function (CloneReceiptRuleSetResponse) {
    /**
     * @internal
     */
    CloneReceiptRuleSetResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CloneReceiptRuleSetResponse = exports.CloneReceiptRuleSetResponse || (exports.CloneReceiptRuleSetResponse = {}));
var LimitExceededException;
(function (LimitExceededException) {
    /**
     * @internal
     */
    LimitExceededException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LimitExceededException = exports.LimitExceededException || (exports.LimitExceededException = {}));
var RuleSetDoesNotExistException;
(function (RuleSetDoesNotExistException) {
    /**
     * @internal
     */
    RuleSetDoesNotExistException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RuleSetDoesNotExistException = exports.RuleSetDoesNotExistException || (exports.RuleSetDoesNotExistException = {}));
var DimensionValueSource;
(function (DimensionValueSource) {
    DimensionValueSource["EMAIL_HEADER"] = "emailHeader";
    DimensionValueSource["LINK_TAG"] = "linkTag";
    DimensionValueSource["MESSAGE_TAG"] = "messageTag";
})(DimensionValueSource = exports.DimensionValueSource || (exports.DimensionValueSource = {}));
var CloudWatchDimensionConfiguration;
(function (CloudWatchDimensionConfiguration) {
    /**
     * @internal
     */
    CloudWatchDimensionConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CloudWatchDimensionConfiguration = exports.CloudWatchDimensionConfiguration || (exports.CloudWatchDimensionConfiguration = {}));
var CloudWatchDestination;
(function (CloudWatchDestination) {
    /**
     * @internal
     */
    CloudWatchDestination.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CloudWatchDestination = exports.CloudWatchDestination || (exports.CloudWatchDestination = {}));
var ConfigurationSet;
(function (ConfigurationSet) {
    /**
     * @internal
     */
    ConfigurationSet.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ConfigurationSet = exports.ConfigurationSet || (exports.ConfigurationSet = {}));
var ConfigurationSetAlreadyExistsException;
(function (ConfigurationSetAlreadyExistsException) {
    /**
     * @internal
     */
    ConfigurationSetAlreadyExistsException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ConfigurationSetAlreadyExistsException = exports.ConfigurationSetAlreadyExistsException || (exports.ConfigurationSetAlreadyExistsException = {}));
var ConfigurationSetAttribute;
(function (ConfigurationSetAttribute) {
    ConfigurationSetAttribute["DELIVERY_OPTIONS"] = "deliveryOptions";
    ConfigurationSetAttribute["EVENT_DESTINATIONS"] = "eventDestinations";
    ConfigurationSetAttribute["REPUTATION_OPTIONS"] = "reputationOptions";
    ConfigurationSetAttribute["TRACKING_OPTIONS"] = "trackingOptions";
})(ConfigurationSetAttribute = exports.ConfigurationSetAttribute || (exports.ConfigurationSetAttribute = {}));
var ConfigurationSetDoesNotExistException;
(function (ConfigurationSetDoesNotExistException) {
    /**
     * @internal
     */
    ConfigurationSetDoesNotExistException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ConfigurationSetDoesNotExistException = exports.ConfigurationSetDoesNotExistException || (exports.ConfigurationSetDoesNotExistException = {}));
var ConfigurationSetSendingPausedException;
(function (ConfigurationSetSendingPausedException) {
    /**
     * @internal
     */
    ConfigurationSetSendingPausedException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ConfigurationSetSendingPausedException = exports.ConfigurationSetSendingPausedException || (exports.ConfigurationSetSendingPausedException = {}));
var CreateConfigurationSetRequest;
(function (CreateConfigurationSetRequest) {
    /**
     * @internal
     */
    CreateConfigurationSetRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateConfigurationSetRequest = exports.CreateConfigurationSetRequest || (exports.CreateConfigurationSetRequest = {}));
var CreateConfigurationSetResponse;
(function (CreateConfigurationSetResponse) {
    /**
     * @internal
     */
    CreateConfigurationSetResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateConfigurationSetResponse = exports.CreateConfigurationSetResponse || (exports.CreateConfigurationSetResponse = {}));
var InvalidConfigurationSetException;
(function (InvalidConfigurationSetException) {
    /**
     * @internal
     */
    InvalidConfigurationSetException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidConfigurationSetException = exports.InvalidConfigurationSetException || (exports.InvalidConfigurationSetException = {}));
var KinesisFirehoseDestination;
(function (KinesisFirehoseDestination) {
    /**
     * @internal
     */
    KinesisFirehoseDestination.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(KinesisFirehoseDestination = exports.KinesisFirehoseDestination || (exports.KinesisFirehoseDestination = {}));
var EventType;
(function (EventType) {
    EventType["BOUNCE"] = "bounce";
    EventType["CLICK"] = "click";
    EventType["COMPLAINT"] = "complaint";
    EventType["DELIVERY"] = "delivery";
    EventType["OPEN"] = "open";
    EventType["REJECT"] = "reject";
    EventType["RENDERING_FAILURE"] = "renderingFailure";
    EventType["SEND"] = "send";
})(EventType = exports.EventType || (exports.EventType = {}));
var SNSDestination;
(function (SNSDestination) {
    /**
     * @internal
     */
    SNSDestination.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SNSDestination = exports.SNSDestination || (exports.SNSDestination = {}));
var EventDestination;
(function (EventDestination) {
    /**
     * @internal
     */
    EventDestination.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(EventDestination = exports.EventDestination || (exports.EventDestination = {}));
var CreateConfigurationSetEventDestinationRequest;
(function (CreateConfigurationSetEventDestinationRequest) {
    /**
     * @internal
     */
    CreateConfigurationSetEventDestinationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateConfigurationSetEventDestinationRequest = exports.CreateConfigurationSetEventDestinationRequest || (exports.CreateConfigurationSetEventDestinationRequest = {}));
var CreateConfigurationSetEventDestinationResponse;
(function (CreateConfigurationSetEventDestinationResponse) {
    /**
     * @internal
     */
    CreateConfigurationSetEventDestinationResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateConfigurationSetEventDestinationResponse = exports.CreateConfigurationSetEventDestinationResponse || (exports.CreateConfigurationSetEventDestinationResponse = {}));
var EventDestinationAlreadyExistsException;
(function (EventDestinationAlreadyExistsException) {
    /**
     * @internal
     */
    EventDestinationAlreadyExistsException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(EventDestinationAlreadyExistsException = exports.EventDestinationAlreadyExistsException || (exports.EventDestinationAlreadyExistsException = {}));
var InvalidCloudWatchDestinationException;
(function (InvalidCloudWatchDestinationException) {
    /**
     * @internal
     */
    InvalidCloudWatchDestinationException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidCloudWatchDestinationException = exports.InvalidCloudWatchDestinationException || (exports.InvalidCloudWatchDestinationException = {}));
var InvalidFirehoseDestinationException;
(function (InvalidFirehoseDestinationException) {
    /**
     * @internal
     */
    InvalidFirehoseDestinationException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidFirehoseDestinationException = exports.InvalidFirehoseDestinationException || (exports.InvalidFirehoseDestinationException = {}));
var InvalidSNSDestinationException;
(function (InvalidSNSDestinationException) {
    /**
     * @internal
     */
    InvalidSNSDestinationException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidSNSDestinationException = exports.InvalidSNSDestinationException || (exports.InvalidSNSDestinationException = {}));
var TrackingOptions;
(function (TrackingOptions) {
    /**
     * @internal
     */
    TrackingOptions.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TrackingOptions = exports.TrackingOptions || (exports.TrackingOptions = {}));
var CreateConfigurationSetTrackingOptionsRequest;
(function (CreateConfigurationSetTrackingOptionsRequest) {
    /**
     * @internal
     */
    CreateConfigurationSetTrackingOptionsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateConfigurationSetTrackingOptionsRequest = exports.CreateConfigurationSetTrackingOptionsRequest || (exports.CreateConfigurationSetTrackingOptionsRequest = {}));
var CreateConfigurationSetTrackingOptionsResponse;
(function (CreateConfigurationSetTrackingOptionsResponse) {
    /**
     * @internal
     */
    CreateConfigurationSetTrackingOptionsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateConfigurationSetTrackingOptionsResponse = exports.CreateConfigurationSetTrackingOptionsResponse || (exports.CreateConfigurationSetTrackingOptionsResponse = {}));
var InvalidTrackingOptionsException;
(function (InvalidTrackingOptionsException) {
    /**
     * @internal
     */
    InvalidTrackingOptionsException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidTrackingOptionsException = exports.InvalidTrackingOptionsException || (exports.InvalidTrackingOptionsException = {}));
var TrackingOptionsAlreadyExistsException;
(function (TrackingOptionsAlreadyExistsException) {
    /**
     * @internal
     */
    TrackingOptionsAlreadyExistsException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TrackingOptionsAlreadyExistsException = exports.TrackingOptionsAlreadyExistsException || (exports.TrackingOptionsAlreadyExistsException = {}));
var CreateCustomVerificationEmailTemplateRequest;
(function (CreateCustomVerificationEmailTemplateRequest) {
    /**
     * @internal
     */
    CreateCustomVerificationEmailTemplateRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateCustomVerificationEmailTemplateRequest = exports.CreateCustomVerificationEmailTemplateRequest || (exports.CreateCustomVerificationEmailTemplateRequest = {}));
var CustomVerificationEmailInvalidContentException;
(function (CustomVerificationEmailInvalidContentException) {
    /**
     * @internal
     */
    CustomVerificationEmailInvalidContentException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CustomVerificationEmailInvalidContentException = exports.CustomVerificationEmailInvalidContentException || (exports.CustomVerificationEmailInvalidContentException = {}));
var CustomVerificationEmailTemplateAlreadyExistsException;
(function (CustomVerificationEmailTemplateAlreadyExistsException) {
    /**
     * @internal
     */
    CustomVerificationEmailTemplateAlreadyExistsException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CustomVerificationEmailTemplateAlreadyExistsException = exports.CustomVerificationEmailTemplateAlreadyExistsException || (exports.CustomVerificationEmailTemplateAlreadyExistsException = {}));
var FromEmailAddressNotVerifiedException;
(function (FromEmailAddressNotVerifiedException) {
    /**
     * @internal
     */
    FromEmailAddressNotVerifiedException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(FromEmailAddressNotVerifiedException = exports.FromEmailAddressNotVerifiedException || (exports.FromEmailAddressNotVerifiedException = {}));
var ReceiptFilterPolicy;
(function (ReceiptFilterPolicy) {
    ReceiptFilterPolicy["Allow"] = "Allow";
    ReceiptFilterPolicy["Block"] = "Block";
})(ReceiptFilterPolicy = exports.ReceiptFilterPolicy || (exports.ReceiptFilterPolicy = {}));
var ReceiptIpFilter;
(function (ReceiptIpFilter) {
    /**
     * @internal
     */
    ReceiptIpFilter.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ReceiptIpFilter = exports.ReceiptIpFilter || (exports.ReceiptIpFilter = {}));
var ReceiptFilter;
(function (ReceiptFilter) {
    /**
     * @internal
     */
    ReceiptFilter.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ReceiptFilter = exports.ReceiptFilter || (exports.ReceiptFilter = {}));
var CreateReceiptFilterRequest;
(function (CreateReceiptFilterRequest) {
    /**
     * @internal
     */
    CreateReceiptFilterRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateReceiptFilterRequest = exports.CreateReceiptFilterRequest || (exports.CreateReceiptFilterRequest = {}));
var CreateReceiptFilterResponse;
(function (CreateReceiptFilterResponse) {
    /**
     * @internal
     */
    CreateReceiptFilterResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateReceiptFilterResponse = exports.CreateReceiptFilterResponse || (exports.CreateReceiptFilterResponse = {}));
var LambdaAction;
(function (LambdaAction) {
    /**
     * @internal
     */
    LambdaAction.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LambdaAction = exports.LambdaAction || (exports.LambdaAction = {}));
var S3Action;
(function (S3Action) {
    /**
     * @internal
     */
    S3Action.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(S3Action = exports.S3Action || (exports.S3Action = {}));
var SNSActionEncoding;
(function (SNSActionEncoding) {
    SNSActionEncoding["Base64"] = "Base64";
    SNSActionEncoding["UTF8"] = "UTF-8";
})(SNSActionEncoding = exports.SNSActionEncoding || (exports.SNSActionEncoding = {}));
var SNSAction;
(function (SNSAction) {
    /**
     * @internal
     */
    SNSAction.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SNSAction = exports.SNSAction || (exports.SNSAction = {}));
var StopScope;
(function (StopScope) {
    StopScope["RULE_SET"] = "RuleSet";
})(StopScope = exports.StopScope || (exports.StopScope = {}));
var StopAction;
(function (StopAction) {
    /**
     * @internal
     */
    StopAction.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StopAction = exports.StopAction || (exports.StopAction = {}));
var WorkmailAction;
(function (WorkmailAction) {
    /**
     * @internal
     */
    WorkmailAction.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(WorkmailAction = exports.WorkmailAction || (exports.WorkmailAction = {}));
var ReceiptAction;
(function (ReceiptAction) {
    /**
     * @internal
     */
    ReceiptAction.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ReceiptAction = exports.ReceiptAction || (exports.ReceiptAction = {}));
var TlsPolicy;
(function (TlsPolicy) {
    TlsPolicy["Optional"] = "Optional";
    TlsPolicy["Require"] = "Require";
})(TlsPolicy = exports.TlsPolicy || (exports.TlsPolicy = {}));
var ReceiptRule;
(function (ReceiptRule) {
    /**
     * @internal
     */
    ReceiptRule.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ReceiptRule = exports.ReceiptRule || (exports.ReceiptRule = {}));
var CreateReceiptRuleRequest;
(function (CreateReceiptRuleRequest) {
    /**
     * @internal
     */
    CreateReceiptRuleRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateReceiptRuleRequest = exports.CreateReceiptRuleRequest || (exports.CreateReceiptRuleRequest = {}));
var CreateReceiptRuleResponse;
(function (CreateReceiptRuleResponse) {
    /**
     * @internal
     */
    CreateReceiptRuleResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateReceiptRuleResponse = exports.CreateReceiptRuleResponse || (exports.CreateReceiptRuleResponse = {}));
var InvalidLambdaFunctionException;
(function (InvalidLambdaFunctionException) {
    /**
     * @internal
     */
    InvalidLambdaFunctionException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidLambdaFunctionException = exports.InvalidLambdaFunctionException || (exports.InvalidLambdaFunctionException = {}));
var InvalidS3ConfigurationException;
(function (InvalidS3ConfigurationException) {
    /**
     * @internal
     */
    InvalidS3ConfigurationException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidS3ConfigurationException = exports.InvalidS3ConfigurationException || (exports.InvalidS3ConfigurationException = {}));
var InvalidSnsTopicException;
(function (InvalidSnsTopicException) {
    /**
     * @internal
     */
    InvalidSnsTopicException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidSnsTopicException = exports.InvalidSnsTopicException || (exports.InvalidSnsTopicException = {}));
var RuleDoesNotExistException;
(function (RuleDoesNotExistException) {
    /**
     * @internal
     */
    RuleDoesNotExistException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RuleDoesNotExistException = exports.RuleDoesNotExistException || (exports.RuleDoesNotExistException = {}));
var CreateReceiptRuleSetRequest;
(function (CreateReceiptRuleSetRequest) {
    /**
     * @internal
     */
    CreateReceiptRuleSetRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateReceiptRuleSetRequest = exports.CreateReceiptRuleSetRequest || (exports.CreateReceiptRuleSetRequest = {}));
var CreateReceiptRuleSetResponse;
(function (CreateReceiptRuleSetResponse) {
    /**
     * @internal
     */
    CreateReceiptRuleSetResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateReceiptRuleSetResponse = exports.CreateReceiptRuleSetResponse || (exports.CreateReceiptRuleSetResponse = {}));
var Template;
(function (Template) {
    /**
     * @internal
     */
    Template.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Template = exports.Template || (exports.Template = {}));
var CreateTemplateRequest;
(function (CreateTemplateRequest) {
    /**
     * @internal
     */
    CreateTemplateRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateTemplateRequest = exports.CreateTemplateRequest || (exports.CreateTemplateRequest = {}));
var CreateTemplateResponse;
(function (CreateTemplateResponse) {
    /**
     * @internal
     */
    CreateTemplateResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateTemplateResponse = exports.CreateTemplateResponse || (exports.CreateTemplateResponse = {}));
var InvalidTemplateException;
(function (InvalidTemplateException) {
    /**
     * @internal
     */
    InvalidTemplateException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidTemplateException = exports.InvalidTemplateException || (exports.InvalidTemplateException = {}));
var CustomMailFromStatus;
(function (CustomMailFromStatus) {
    CustomMailFromStatus["Failed"] = "Failed";
    CustomMailFromStatus["Pending"] = "Pending";
    CustomMailFromStatus["Success"] = "Success";
    CustomMailFromStatus["TemporaryFailure"] = "TemporaryFailure";
})(CustomMailFromStatus = exports.CustomMailFromStatus || (exports.CustomMailFromStatus = {}));
var CustomVerificationEmailTemplate;
(function (CustomVerificationEmailTemplate) {
    /**
     * @internal
     */
    CustomVerificationEmailTemplate.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CustomVerificationEmailTemplate = exports.CustomVerificationEmailTemplate || (exports.CustomVerificationEmailTemplate = {}));
var CustomVerificationEmailTemplateDoesNotExistException;
(function (CustomVerificationEmailTemplateDoesNotExistException) {
    /**
     * @internal
     */
    CustomVerificationEmailTemplateDoesNotExistException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CustomVerificationEmailTemplateDoesNotExistException = exports.CustomVerificationEmailTemplateDoesNotExistException || (exports.CustomVerificationEmailTemplateDoesNotExistException = {}));
var DeleteConfigurationSetRequest;
(function (DeleteConfigurationSetRequest) {
    /**
     * @internal
     */
    DeleteConfigurationSetRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteConfigurationSetRequest = exports.DeleteConfigurationSetRequest || (exports.DeleteConfigurationSetRequest = {}));
var DeleteConfigurationSetResponse;
(function (DeleteConfigurationSetResponse) {
    /**
     * @internal
     */
    DeleteConfigurationSetResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteConfigurationSetResponse = exports.DeleteConfigurationSetResponse || (exports.DeleteConfigurationSetResponse = {}));
var DeleteConfigurationSetEventDestinationRequest;
(function (DeleteConfigurationSetEventDestinationRequest) {
    /**
     * @internal
     */
    DeleteConfigurationSetEventDestinationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteConfigurationSetEventDestinationRequest = exports.DeleteConfigurationSetEventDestinationRequest || (exports.DeleteConfigurationSetEventDestinationRequest = {}));
var DeleteConfigurationSetEventDestinationResponse;
(function (DeleteConfigurationSetEventDestinationResponse) {
    /**
     * @internal
     */
    DeleteConfigurationSetEventDestinationResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteConfigurationSetEventDestinationResponse = exports.DeleteConfigurationSetEventDestinationResponse || (exports.DeleteConfigurationSetEventDestinationResponse = {}));
var EventDestinationDoesNotExistException;
(function (EventDestinationDoesNotExistException) {
    /**
     * @internal
     */
    EventDestinationDoesNotExistException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(EventDestinationDoesNotExistException = exports.EventDestinationDoesNotExistException || (exports.EventDestinationDoesNotExistException = {}));
var DeleteConfigurationSetTrackingOptionsRequest;
(function (DeleteConfigurationSetTrackingOptionsRequest) {
    /**
     * @internal
     */
    DeleteConfigurationSetTrackingOptionsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteConfigurationSetTrackingOptionsRequest = exports.DeleteConfigurationSetTrackingOptionsRequest || (exports.DeleteConfigurationSetTrackingOptionsRequest = {}));
var DeleteConfigurationSetTrackingOptionsResponse;
(function (DeleteConfigurationSetTrackingOptionsResponse) {
    /**
     * @internal
     */
    DeleteConfigurationSetTrackingOptionsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteConfigurationSetTrackingOptionsResponse = exports.DeleteConfigurationSetTrackingOptionsResponse || (exports.DeleteConfigurationSetTrackingOptionsResponse = {}));
var TrackingOptionsDoesNotExistException;
(function (TrackingOptionsDoesNotExistException) {
    /**
     * @internal
     */
    TrackingOptionsDoesNotExistException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TrackingOptionsDoesNotExistException = exports.TrackingOptionsDoesNotExistException || (exports.TrackingOptionsDoesNotExistException = {}));
var DeleteCustomVerificationEmailTemplateRequest;
(function (DeleteCustomVerificationEmailTemplateRequest) {
    /**
     * @internal
     */
    DeleteCustomVerificationEmailTemplateRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteCustomVerificationEmailTemplateRequest = exports.DeleteCustomVerificationEmailTemplateRequest || (exports.DeleteCustomVerificationEmailTemplateRequest = {}));
var DeleteIdentityRequest;
(function (DeleteIdentityRequest) {
    /**
     * @internal
     */
    DeleteIdentityRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteIdentityRequest = exports.DeleteIdentityRequest || (exports.DeleteIdentityRequest = {}));
var DeleteIdentityResponse;
(function (DeleteIdentityResponse) {
    /**
     * @internal
     */
    DeleteIdentityResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteIdentityResponse = exports.DeleteIdentityResponse || (exports.DeleteIdentityResponse = {}));
var DeleteIdentityPolicyRequest;
(function (DeleteIdentityPolicyRequest) {
    /**
     * @internal
     */
    DeleteIdentityPolicyRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteIdentityPolicyRequest = exports.DeleteIdentityPolicyRequest || (exports.DeleteIdentityPolicyRequest = {}));
var DeleteIdentityPolicyResponse;
(function (DeleteIdentityPolicyResponse) {
    /**
     * @internal
     */
    DeleteIdentityPolicyResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteIdentityPolicyResponse = exports.DeleteIdentityPolicyResponse || (exports.DeleteIdentityPolicyResponse = {}));
var DeleteReceiptFilterRequest;
(function (DeleteReceiptFilterRequest) {
    /**
     * @internal
     */
    DeleteReceiptFilterRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteReceiptFilterRequest = exports.DeleteReceiptFilterRequest || (exports.DeleteReceiptFilterRequest = {}));
var DeleteReceiptFilterResponse;
(function (DeleteReceiptFilterResponse) {
    /**
     * @internal
     */
    DeleteReceiptFilterResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteReceiptFilterResponse = exports.DeleteReceiptFilterResponse || (exports.DeleteReceiptFilterResponse = {}));
var DeleteReceiptRuleRequest;
(function (DeleteReceiptRuleRequest) {
    /**
     * @internal
     */
    DeleteReceiptRuleRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteReceiptRuleRequest = exports.DeleteReceiptRuleRequest || (exports.DeleteReceiptRuleRequest = {}));
var DeleteReceiptRuleResponse;
(function (DeleteReceiptRuleResponse) {
    /**
     * @internal
     */
    DeleteReceiptRuleResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteReceiptRuleResponse = exports.DeleteReceiptRuleResponse || (exports.DeleteReceiptRuleResponse = {}));
var DeleteReceiptRuleSetRequest;
(function (DeleteReceiptRuleSetRequest) {
    /**
     * @internal
     */
    DeleteReceiptRuleSetRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteReceiptRuleSetRequest = exports.DeleteReceiptRuleSetRequest || (exports.DeleteReceiptRuleSetRequest = {}));
var DeleteReceiptRuleSetResponse;
(function (DeleteReceiptRuleSetResponse) {
    /**
     * @internal
     */
    DeleteReceiptRuleSetResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteReceiptRuleSetResponse = exports.DeleteReceiptRuleSetResponse || (exports.DeleteReceiptRuleSetResponse = {}));
var DeleteTemplateRequest;
(function (DeleteTemplateRequest) {
    /**
     * @internal
     */
    DeleteTemplateRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteTemplateRequest = exports.DeleteTemplateRequest || (exports.DeleteTemplateRequest = {}));
var DeleteTemplateResponse;
(function (DeleteTemplateResponse) {
    /**
     * @internal
     */
    DeleteTemplateResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteTemplateResponse = exports.DeleteTemplateResponse || (exports.DeleteTemplateResponse = {}));
var DeleteVerifiedEmailAddressRequest;
(function (DeleteVerifiedEmailAddressRequest) {
    /**
     * @internal
     */
    DeleteVerifiedEmailAddressRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteVerifiedEmailAddressRequest = exports.DeleteVerifiedEmailAddressRequest || (exports.DeleteVerifiedEmailAddressRequest = {}));
var DeliveryOptions;
(function (DeliveryOptions) {
    /**
     * @internal
     */
    DeliveryOptions.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeliveryOptions = exports.DeliveryOptions || (exports.DeliveryOptions = {}));
var DescribeActiveReceiptRuleSetRequest;
(function (DescribeActiveReceiptRuleSetRequest) {
    /**
     * @internal
     */
    DescribeActiveReceiptRuleSetRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeActiveReceiptRuleSetRequest = exports.DescribeActiveReceiptRuleSetRequest || (exports.DescribeActiveReceiptRuleSetRequest = {}));
var ReceiptRuleSetMetadata;
(function (ReceiptRuleSetMetadata) {
    /**
     * @internal
     */
    ReceiptRuleSetMetadata.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ReceiptRuleSetMetadata = exports.ReceiptRuleSetMetadata || (exports.ReceiptRuleSetMetadata = {}));
var DescribeActiveReceiptRuleSetResponse;
(function (DescribeActiveReceiptRuleSetResponse) {
    /**
     * @internal
     */
    DescribeActiveReceiptRuleSetResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeActiveReceiptRuleSetResponse = exports.DescribeActiveReceiptRuleSetResponse || (exports.DescribeActiveReceiptRuleSetResponse = {}));
var DescribeConfigurationSetRequest;
(function (DescribeConfigurationSetRequest) {
    /**
     * @internal
     */
    DescribeConfigurationSetRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeConfigurationSetRequest = exports.DescribeConfigurationSetRequest || (exports.DescribeConfigurationSetRequest = {}));
var ReputationOptions;
(function (ReputationOptions) {
    /**
     * @internal
     */
    ReputationOptions.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ReputationOptions = exports.ReputationOptions || (exports.ReputationOptions = {}));
var DescribeConfigurationSetResponse;
(function (DescribeConfigurationSetResponse) {
    /**
     * @internal
     */
    DescribeConfigurationSetResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeConfigurationSetResponse = exports.DescribeConfigurationSetResponse || (exports.DescribeConfigurationSetResponse = {}));
var DescribeReceiptRuleRequest;
(function (DescribeReceiptRuleRequest) {
    /**
     * @internal
     */
    DescribeReceiptRuleRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeReceiptRuleRequest = exports.DescribeReceiptRuleRequest || (exports.DescribeReceiptRuleRequest = {}));
var DescribeReceiptRuleResponse;
(function (DescribeReceiptRuleResponse) {
    /**
     * @internal
     */
    DescribeReceiptRuleResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeReceiptRuleResponse = exports.DescribeReceiptRuleResponse || (exports.DescribeReceiptRuleResponse = {}));
var DescribeReceiptRuleSetRequest;
(function (DescribeReceiptRuleSetRequest) {
    /**
     * @internal
     */
    DescribeReceiptRuleSetRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeReceiptRuleSetRequest = exports.DescribeReceiptRuleSetRequest || (exports.DescribeReceiptRuleSetRequest = {}));
var DescribeReceiptRuleSetResponse;
(function (DescribeReceiptRuleSetResponse) {
    /**
     * @internal
     */
    DescribeReceiptRuleSetResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeReceiptRuleSetResponse = exports.DescribeReceiptRuleSetResponse || (exports.DescribeReceiptRuleSetResponse = {}));
var IdentityDkimAttributes;
(function (IdentityDkimAttributes) {
    /**
     * @internal
     */
    IdentityDkimAttributes.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(IdentityDkimAttributes = exports.IdentityDkimAttributes || (exports.IdentityDkimAttributes = {}));
var GetAccountSendingEnabledResponse;
(function (GetAccountSendingEnabledResponse) {
    /**
     * @internal
     */
    GetAccountSendingEnabledResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetAccountSendingEnabledResponse = exports.GetAccountSendingEnabledResponse || (exports.GetAccountSendingEnabledResponse = {}));
var GetCustomVerificationEmailTemplateRequest;
(function (GetCustomVerificationEmailTemplateRequest) {
    /**
     * @internal
     */
    GetCustomVerificationEmailTemplateRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetCustomVerificationEmailTemplateRequest = exports.GetCustomVerificationEmailTemplateRequest || (exports.GetCustomVerificationEmailTemplateRequest = {}));
var GetCustomVerificationEmailTemplateResponse;
(function (GetCustomVerificationEmailTemplateResponse) {
    /**
     * @internal
     */
    GetCustomVerificationEmailTemplateResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetCustomVerificationEmailTemplateResponse = exports.GetCustomVerificationEmailTemplateResponse || (exports.GetCustomVerificationEmailTemplateResponse = {}));
var GetIdentityDkimAttributesRequest;
(function (GetIdentityDkimAttributesRequest) {
    /**
     * @internal
     */
    GetIdentityDkimAttributesRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetIdentityDkimAttributesRequest = exports.GetIdentityDkimAttributesRequest || (exports.GetIdentityDkimAttributesRequest = {}));
var GetIdentityDkimAttributesResponse;
(function (GetIdentityDkimAttributesResponse) {
    /**
     * @internal
     */
    GetIdentityDkimAttributesResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetIdentityDkimAttributesResponse = exports.GetIdentityDkimAttributesResponse || (exports.GetIdentityDkimAttributesResponse = {}));
var GetIdentityMailFromDomainAttributesRequest;
(function (GetIdentityMailFromDomainAttributesRequest) {
    /**
     * @internal
     */
    GetIdentityMailFromDomainAttributesRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetIdentityMailFromDomainAttributesRequest = exports.GetIdentityMailFromDomainAttributesRequest || (exports.GetIdentityMailFromDomainAttributesRequest = {}));
var IdentityMailFromDomainAttributes;
(function (IdentityMailFromDomainAttributes) {
    /**
     * @internal
     */
    IdentityMailFromDomainAttributes.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(IdentityMailFromDomainAttributes = exports.IdentityMailFromDomainAttributes || (exports.IdentityMailFromDomainAttributes = {}));
var GetIdentityMailFromDomainAttributesResponse;
(function (GetIdentityMailFromDomainAttributesResponse) {
    /**
     * @internal
     */
    GetIdentityMailFromDomainAttributesResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetIdentityMailFromDomainAttributesResponse = exports.GetIdentityMailFromDomainAttributesResponse || (exports.GetIdentityMailFromDomainAttributesResponse = {}));
var GetIdentityNotificationAttributesRequest;
(function (GetIdentityNotificationAttributesRequest) {
    /**
     * @internal
     */
    GetIdentityNotificationAttributesRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetIdentityNotificationAttributesRequest = exports.GetIdentityNotificationAttributesRequest || (exports.GetIdentityNotificationAttributesRequest = {}));
var IdentityNotificationAttributes;
(function (IdentityNotificationAttributes) {
    /**
     * @internal
     */
    IdentityNotificationAttributes.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(IdentityNotificationAttributes = exports.IdentityNotificationAttributes || (exports.IdentityNotificationAttributes = {}));
var GetIdentityNotificationAttributesResponse;
(function (GetIdentityNotificationAttributesResponse) {
    /**
     * @internal
     */
    GetIdentityNotificationAttributesResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetIdentityNotificationAttributesResponse = exports.GetIdentityNotificationAttributesResponse || (exports.GetIdentityNotificationAttributesResponse = {}));
var GetIdentityPoliciesRequest;
(function (GetIdentityPoliciesRequest) {
    /**
     * @internal
     */
    GetIdentityPoliciesRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetIdentityPoliciesRequest = exports.GetIdentityPoliciesRequest || (exports.GetIdentityPoliciesRequest = {}));
var GetIdentityPoliciesResponse;
(function (GetIdentityPoliciesResponse) {
    /**
     * @internal
     */
    GetIdentityPoliciesResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetIdentityPoliciesResponse = exports.GetIdentityPoliciesResponse || (exports.GetIdentityPoliciesResponse = {}));
var GetIdentityVerificationAttributesRequest;
(function (GetIdentityVerificationAttributesRequest) {
    /**
     * @internal
     */
    GetIdentityVerificationAttributesRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetIdentityVerificationAttributesRequest = exports.GetIdentityVerificationAttributesRequest || (exports.GetIdentityVerificationAttributesRequest = {}));
var IdentityVerificationAttributes;
(function (IdentityVerificationAttributes) {
    /**
     * @internal
     */
    IdentityVerificationAttributes.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(IdentityVerificationAttributes = exports.IdentityVerificationAttributes || (exports.IdentityVerificationAttributes = {}));
var GetIdentityVerificationAttributesResponse;
(function (GetIdentityVerificationAttributesResponse) {
    /**
     * @internal
     */
    GetIdentityVerificationAttributesResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetIdentityVerificationAttributesResponse = exports.GetIdentityVerificationAttributesResponse || (exports.GetIdentityVerificationAttributesResponse = {}));
var GetSendQuotaResponse;
(function (GetSendQuotaResponse) {
    /**
     * @internal
     */
    GetSendQuotaResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetSendQuotaResponse = exports.GetSendQuotaResponse || (exports.GetSendQuotaResponse = {}));
var SendDataPoint;
(function (SendDataPoint) {
    /**
     * @internal
     */
    SendDataPoint.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SendDataPoint = exports.SendDataPoint || (exports.SendDataPoint = {}));
var GetSendStatisticsResponse;
(function (GetSendStatisticsResponse) {
    /**
     * @internal
     */
    GetSendStatisticsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetSendStatisticsResponse = exports.GetSendStatisticsResponse || (exports.GetSendStatisticsResponse = {}));
var GetTemplateRequest;
(function (GetTemplateRequest) {
    /**
     * @internal
     */
    GetTemplateRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetTemplateRequest = exports.GetTemplateRequest || (exports.GetTemplateRequest = {}));
var GetTemplateResponse;
(function (GetTemplateResponse) {
    /**
     * @internal
     */
    GetTemplateResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetTemplateResponse = exports.GetTemplateResponse || (exports.GetTemplateResponse = {}));
var TemplateDoesNotExistException;
(function (TemplateDoesNotExistException) {
    /**
     * @internal
     */
    TemplateDoesNotExistException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TemplateDoesNotExistException = exports.TemplateDoesNotExistException || (exports.TemplateDoesNotExistException = {}));
var InvalidDeliveryOptionsException;
(function (InvalidDeliveryOptionsException) {
    /**
     * @internal
     */
    InvalidDeliveryOptionsException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidDeliveryOptionsException = exports.InvalidDeliveryOptionsException || (exports.InvalidDeliveryOptionsException = {}));
var InvalidPolicyException;
(function (InvalidPolicyException) {
    /**
     * @internal
     */
    InvalidPolicyException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidPolicyException = exports.InvalidPolicyException || (exports.InvalidPolicyException = {}));
var InvalidRenderingParameterException;
(function (InvalidRenderingParameterException) {
    /**
     * @internal
     */
    InvalidRenderingParameterException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidRenderingParameterException = exports.InvalidRenderingParameterException || (exports.InvalidRenderingParameterException = {}));
var ListConfigurationSetsRequest;
(function (ListConfigurationSetsRequest) {
    /**
     * @internal
     */
    ListConfigurationSetsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListConfigurationSetsRequest = exports.ListConfigurationSetsRequest || (exports.ListConfigurationSetsRequest = {}));
var ListConfigurationSetsResponse;
(function (ListConfigurationSetsResponse) {
    /**
     * @internal
     */
    ListConfigurationSetsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListConfigurationSetsResponse = exports.ListConfigurationSetsResponse || (exports.ListConfigurationSetsResponse = {}));
var ListCustomVerificationEmailTemplatesRequest;
(function (ListCustomVerificationEmailTemplatesRequest) {
    /**
     * @internal
     */
    ListCustomVerificationEmailTemplatesRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListCustomVerificationEmailTemplatesRequest = exports.ListCustomVerificationEmailTemplatesRequest || (exports.ListCustomVerificationEmailTemplatesRequest = {}));
var ListCustomVerificationEmailTemplatesResponse;
(function (ListCustomVerificationEmailTemplatesResponse) {
    /**
     * @internal
     */
    ListCustomVerificationEmailTemplatesResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListCustomVerificationEmailTemplatesResponse = exports.ListCustomVerificationEmailTemplatesResponse || (exports.ListCustomVerificationEmailTemplatesResponse = {}));
var ListIdentitiesRequest;
(function (ListIdentitiesRequest) {
    /**
     * @internal
     */
    ListIdentitiesRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListIdentitiesRequest = exports.ListIdentitiesRequest || (exports.ListIdentitiesRequest = {}));
var ListIdentitiesResponse;
(function (ListIdentitiesResponse) {
    /**
     * @internal
     */
    ListIdentitiesResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListIdentitiesResponse = exports.ListIdentitiesResponse || (exports.ListIdentitiesResponse = {}));
var ListIdentityPoliciesRequest;
(function (ListIdentityPoliciesRequest) {
    /**
     * @internal
     */
    ListIdentityPoliciesRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListIdentityPoliciesRequest = exports.ListIdentityPoliciesRequest || (exports.ListIdentityPoliciesRequest = {}));
var ListIdentityPoliciesResponse;
(function (ListIdentityPoliciesResponse) {
    /**
     * @internal
     */
    ListIdentityPoliciesResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListIdentityPoliciesResponse = exports.ListIdentityPoliciesResponse || (exports.ListIdentityPoliciesResponse = {}));
var ListReceiptFiltersRequest;
(function (ListReceiptFiltersRequest) {
    /**
     * @internal
     */
    ListReceiptFiltersRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListReceiptFiltersRequest = exports.ListReceiptFiltersRequest || (exports.ListReceiptFiltersRequest = {}));
var ListReceiptFiltersResponse;
(function (ListReceiptFiltersResponse) {
    /**
     * @internal
     */
    ListReceiptFiltersResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListReceiptFiltersResponse = exports.ListReceiptFiltersResponse || (exports.ListReceiptFiltersResponse = {}));
var ListReceiptRuleSetsRequest;
(function (ListReceiptRuleSetsRequest) {
    /**
     * @internal
     */
    ListReceiptRuleSetsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListReceiptRuleSetsRequest = exports.ListReceiptRuleSetsRequest || (exports.ListReceiptRuleSetsRequest = {}));
var ListReceiptRuleSetsResponse;
(function (ListReceiptRuleSetsResponse) {
    /**
     * @internal
     */
    ListReceiptRuleSetsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListReceiptRuleSetsResponse = exports.ListReceiptRuleSetsResponse || (exports.ListReceiptRuleSetsResponse = {}));
var ListTemplatesRequest;
(function (ListTemplatesRequest) {
    /**
     * @internal
     */
    ListTemplatesRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListTemplatesRequest = exports.ListTemplatesRequest || (exports.ListTemplatesRequest = {}));
var TemplateMetadata;
(function (TemplateMetadata) {
    /**
     * @internal
     */
    TemplateMetadata.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TemplateMetadata = exports.TemplateMetadata || (exports.TemplateMetadata = {}));
var ListTemplatesResponse;
(function (ListTemplatesResponse) {
    /**
     * @internal
     */
    ListTemplatesResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListTemplatesResponse = exports.ListTemplatesResponse || (exports.ListTemplatesResponse = {}));
var ListVerifiedEmailAddressesResponse;
(function (ListVerifiedEmailAddressesResponse) {
    /**
     * @internal
     */
    ListVerifiedEmailAddressesResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListVerifiedEmailAddressesResponse = exports.ListVerifiedEmailAddressesResponse || (exports.ListVerifiedEmailAddressesResponse = {}));
var MailFromDomainNotVerifiedException;
(function (MailFromDomainNotVerifiedException) {
    /**
     * @internal
     */
    MailFromDomainNotVerifiedException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(MailFromDomainNotVerifiedException = exports.MailFromDomainNotVerifiedException || (exports.MailFromDomainNotVerifiedException = {}));
var Message;
(function (Message) {
    /**
     * @internal
     */
    Message.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Message = exports.Message || (exports.Message = {}));
var MessageDsn;
(function (MessageDsn) {
    /**
     * @internal
     */
    MessageDsn.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(MessageDsn = exports.MessageDsn || (exports.MessageDsn = {}));
var MessageRejected;
(function (MessageRejected) {
    /**
     * @internal
     */
    MessageRejected.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(MessageRejected = exports.MessageRejected || (exports.MessageRejected = {}));
var MissingRenderingAttributeException;
(function (MissingRenderingAttributeException) {
    /**
     * @internal
     */
    MissingRenderingAttributeException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(MissingRenderingAttributeException = exports.MissingRenderingAttributeException || (exports.MissingRenderingAttributeException = {}));
var ProductionAccessNotGrantedException;
(function (ProductionAccessNotGrantedException) {
    /**
     * @internal
     */
    ProductionAccessNotGrantedException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ProductionAccessNotGrantedException = exports.ProductionAccessNotGrantedException || (exports.ProductionAccessNotGrantedException = {}));
var PutConfigurationSetDeliveryOptionsRequest;
(function (PutConfigurationSetDeliveryOptionsRequest) {
    /**
     * @internal
     */
    PutConfigurationSetDeliveryOptionsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutConfigurationSetDeliveryOptionsRequest = exports.PutConfigurationSetDeliveryOptionsRequest || (exports.PutConfigurationSetDeliveryOptionsRequest = {}));
var PutConfigurationSetDeliveryOptionsResponse;
(function (PutConfigurationSetDeliveryOptionsResponse) {
    /**
     * @internal
     */
    PutConfigurationSetDeliveryOptionsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutConfigurationSetDeliveryOptionsResponse = exports.PutConfigurationSetDeliveryOptionsResponse || (exports.PutConfigurationSetDeliveryOptionsResponse = {}));
var PutIdentityPolicyRequest;
(function (PutIdentityPolicyRequest) {
    /**
     * @internal
     */
    PutIdentityPolicyRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutIdentityPolicyRequest = exports.PutIdentityPolicyRequest || (exports.PutIdentityPolicyRequest = {}));
var PutIdentityPolicyResponse;
(function (PutIdentityPolicyResponse) {
    /**
     * @internal
     */
    PutIdentityPolicyResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutIdentityPolicyResponse = exports.PutIdentityPolicyResponse || (exports.PutIdentityPolicyResponse = {}));
var RawMessage;
(function (RawMessage) {
    /**
     * @internal
     */
    RawMessage.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RawMessage = exports.RawMessage || (exports.RawMessage = {}));
var ReorderReceiptRuleSetRequest;
(function (ReorderReceiptRuleSetRequest) {
    /**
     * @internal
     */
    ReorderReceiptRuleSetRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ReorderReceiptRuleSetRequest = exports.ReorderReceiptRuleSetRequest || (exports.ReorderReceiptRuleSetRequest = {}));
var ReorderReceiptRuleSetResponse;
(function (ReorderReceiptRuleSetResponse) {
    /**
     * @internal
     */
    ReorderReceiptRuleSetResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ReorderReceiptRuleSetResponse = exports.ReorderReceiptRuleSetResponse || (exports.ReorderReceiptRuleSetResponse = {}));
var SendBounceRequest;
(function (SendBounceRequest) {
    /**
     * @internal
     */
    SendBounceRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SendBounceRequest = exports.SendBounceRequest || (exports.SendBounceRequest = {}));
var SendBounceResponse;
(function (SendBounceResponse) {
    /**
     * @internal
     */
    SendBounceResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SendBounceResponse = exports.SendBounceResponse || (exports.SendBounceResponse = {}));
var SendBulkTemplatedEmailRequest;
(function (SendBulkTemplatedEmailRequest) {
    /**
     * @internal
     */
    SendBulkTemplatedEmailRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SendBulkTemplatedEmailRequest = exports.SendBulkTemplatedEmailRequest || (exports.SendBulkTemplatedEmailRequest = {}));
var SendBulkTemplatedEmailResponse;
(function (SendBulkTemplatedEmailResponse) {
    /**
     * @internal
     */
    SendBulkTemplatedEmailResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SendBulkTemplatedEmailResponse = exports.SendBulkTemplatedEmailResponse || (exports.SendBulkTemplatedEmailResponse = {}));
var SendCustomVerificationEmailRequest;
(function (SendCustomVerificationEmailRequest) {
    /**
     * @internal
     */
    SendCustomVerificationEmailRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SendCustomVerificationEmailRequest = exports.SendCustomVerificationEmailRequest || (exports.SendCustomVerificationEmailRequest = {}));
var SendCustomVerificationEmailResponse;
(function (SendCustomVerificationEmailResponse) {
    /**
     * @internal
     */
    SendCustomVerificationEmailResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SendCustomVerificationEmailResponse = exports.SendCustomVerificationEmailResponse || (exports.SendCustomVerificationEmailResponse = {}));
var SendEmailRequest;
(function (SendEmailRequest) {
    /**
     * @internal
     */
    SendEmailRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SendEmailRequest = exports.SendEmailRequest || (exports.SendEmailRequest = {}));
var SendEmailResponse;
(function (SendEmailResponse) {
    /**
     * @internal
     */
    SendEmailResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SendEmailResponse = exports.SendEmailResponse || (exports.SendEmailResponse = {}));
var SendRawEmailRequest;
(function (SendRawEmailRequest) {
    /**
     * @internal
     */
    SendRawEmailRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SendRawEmailRequest = exports.SendRawEmailRequest || (exports.SendRawEmailRequest = {}));
var SendRawEmailResponse;
(function (SendRawEmailResponse) {
    /**
     * @internal
     */
    SendRawEmailResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SendRawEmailResponse = exports.SendRawEmailResponse || (exports.SendRawEmailResponse = {}));
var SendTemplatedEmailRequest;
(function (SendTemplatedEmailRequest) {
    /**
     * @internal
     */
    SendTemplatedEmailRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SendTemplatedEmailRequest = exports.SendTemplatedEmailRequest || (exports.SendTemplatedEmailRequest = {}));
var SendTemplatedEmailResponse;
(function (SendTemplatedEmailResponse) {
    /**
     * @internal
     */
    SendTemplatedEmailResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SendTemplatedEmailResponse = exports.SendTemplatedEmailResponse || (exports.SendTemplatedEmailResponse = {}));
var SetActiveReceiptRuleSetRequest;
(function (SetActiveReceiptRuleSetRequest) {
    /**
     * @internal
     */
    SetActiveReceiptRuleSetRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SetActiveReceiptRuleSetRequest = exports.SetActiveReceiptRuleSetRequest || (exports.SetActiveReceiptRuleSetRequest = {}));
var SetActiveReceiptRuleSetResponse;
(function (SetActiveReceiptRuleSetResponse) {
    /**
     * @internal
     */
    SetActiveReceiptRuleSetResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SetActiveReceiptRuleSetResponse = exports.SetActiveReceiptRuleSetResponse || (exports.SetActiveReceiptRuleSetResponse = {}));
var SetIdentityDkimEnabledRequest;
(function (SetIdentityDkimEnabledRequest) {
    /**
     * @internal
     */
    SetIdentityDkimEnabledRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SetIdentityDkimEnabledRequest = exports.SetIdentityDkimEnabledRequest || (exports.SetIdentityDkimEnabledRequest = {}));
var SetIdentityDkimEnabledResponse;
(function (SetIdentityDkimEnabledResponse) {
    /**
     * @internal
     */
    SetIdentityDkimEnabledResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SetIdentityDkimEnabledResponse = exports.SetIdentityDkimEnabledResponse || (exports.SetIdentityDkimEnabledResponse = {}));
var SetIdentityFeedbackForwardingEnabledRequest;
(function (SetIdentityFeedbackForwardingEnabledRequest) {
    /**
     * @internal
     */
    SetIdentityFeedbackForwardingEnabledRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SetIdentityFeedbackForwardingEnabledRequest = exports.SetIdentityFeedbackForwardingEnabledRequest || (exports.SetIdentityFeedbackForwardingEnabledRequest = {}));
var SetIdentityFeedbackForwardingEnabledResponse;
(function (SetIdentityFeedbackForwardingEnabledResponse) {
    /**
     * @internal
     */
    SetIdentityFeedbackForwardingEnabledResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SetIdentityFeedbackForwardingEnabledResponse = exports.SetIdentityFeedbackForwardingEnabledResponse || (exports.SetIdentityFeedbackForwardingEnabledResponse = {}));
var SetIdentityHeadersInNotificationsEnabledRequest;
(function (SetIdentityHeadersInNotificationsEnabledRequest) {
    /**
     * @internal
     */
    SetIdentityHeadersInNotificationsEnabledRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SetIdentityHeadersInNotificationsEnabledRequest = exports.SetIdentityHeadersInNotificationsEnabledRequest || (exports.SetIdentityHeadersInNotificationsEnabledRequest = {}));
var SetIdentityHeadersInNotificationsEnabledResponse;
(function (SetIdentityHeadersInNotificationsEnabledResponse) {
    /**
     * @internal
     */
    SetIdentityHeadersInNotificationsEnabledResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SetIdentityHeadersInNotificationsEnabledResponse = exports.SetIdentityHeadersInNotificationsEnabledResponse || (exports.SetIdentityHeadersInNotificationsEnabledResponse = {}));
var SetIdentityMailFromDomainRequest;
(function (SetIdentityMailFromDomainRequest) {
    /**
     * @internal
     */
    SetIdentityMailFromDomainRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SetIdentityMailFromDomainRequest = exports.SetIdentityMailFromDomainRequest || (exports.SetIdentityMailFromDomainRequest = {}));
var SetIdentityMailFromDomainResponse;
(function (SetIdentityMailFromDomainResponse) {
    /**
     * @internal
     */
    SetIdentityMailFromDomainResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SetIdentityMailFromDomainResponse = exports.SetIdentityMailFromDomainResponse || (exports.SetIdentityMailFromDomainResponse = {}));
var SetIdentityNotificationTopicRequest;
(function (SetIdentityNotificationTopicRequest) {
    /**
     * @internal
     */
    SetIdentityNotificationTopicRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SetIdentityNotificationTopicRequest = exports.SetIdentityNotificationTopicRequest || (exports.SetIdentityNotificationTopicRequest = {}));
var SetIdentityNotificationTopicResponse;
(function (SetIdentityNotificationTopicResponse) {
    /**
     * @internal
     */
    SetIdentityNotificationTopicResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SetIdentityNotificationTopicResponse = exports.SetIdentityNotificationTopicResponse || (exports.SetIdentityNotificationTopicResponse = {}));
var SetReceiptRulePositionRequest;
(function (SetReceiptRulePositionRequest) {
    /**
     * @internal
     */
    SetReceiptRulePositionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SetReceiptRulePositionRequest = exports.SetReceiptRulePositionRequest || (exports.SetReceiptRulePositionRequest = {}));
var SetReceiptRulePositionResponse;
(function (SetReceiptRulePositionResponse) {
    /**
     * @internal
     */
    SetReceiptRulePositionResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SetReceiptRulePositionResponse = exports.SetReceiptRulePositionResponse || (exports.SetReceiptRulePositionResponse = {}));
var TestRenderTemplateRequest;
(function (TestRenderTemplateRequest) {
    /**
     * @internal
     */
    TestRenderTemplateRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TestRenderTemplateRequest = exports.TestRenderTemplateRequest || (exports.TestRenderTemplateRequest = {}));
var TestRenderTemplateResponse;
(function (TestRenderTemplateResponse) {
    /**
     * @internal
     */
    TestRenderTemplateResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TestRenderTemplateResponse = exports.TestRenderTemplateResponse || (exports.TestRenderTemplateResponse = {}));
var UpdateAccountSendingEnabledRequest;
(function (UpdateAccountSendingEnabledRequest) {
    /**
     * @internal
     */
    UpdateAccountSendingEnabledRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UpdateAccountSendingEnabledRequest = exports.UpdateAccountSendingEnabledRequest || (exports.UpdateAccountSendingEnabledRequest = {}));
var UpdateConfigurationSetEventDestinationRequest;
(function (UpdateConfigurationSetEventDestinationRequest) {
    /**
     * @internal
     */
    UpdateConfigurationSetEventDestinationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UpdateConfigurationSetEventDestinationRequest = exports.UpdateConfigurationSetEventDestinationRequest || (exports.UpdateConfigurationSetEventDestinationRequest = {}));
var UpdateConfigurationSetEventDestinationResponse;
(function (UpdateConfigurationSetEventDestinationResponse) {
    /**
     * @internal
     */
    UpdateConfigurationSetEventDestinationResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UpdateConfigurationSetEventDestinationResponse = exports.UpdateConfigurationSetEventDestinationResponse || (exports.UpdateConfigurationSetEventDestinationResponse = {}));
var UpdateConfigurationSetReputationMetricsEnabledRequest;
(function (UpdateConfigurationSetReputationMetricsEnabledRequest) {
    /**
     * @internal
     */
    UpdateConfigurationSetReputationMetricsEnabledRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UpdateConfigurationSetReputationMetricsEnabledRequest = exports.UpdateConfigurationSetReputationMetricsEnabledRequest || (exports.UpdateConfigurationSetReputationMetricsEnabledRequest = {}));
var UpdateConfigurationSetSendingEnabledRequest;
(function (UpdateConfigurationSetSendingEnabledRequest) {
    /**
     * @internal
     */
    UpdateConfigurationSetSendingEnabledRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UpdateConfigurationSetSendingEnabledRequest = exports.UpdateConfigurationSetSendingEnabledRequest || (exports.UpdateConfigurationSetSendingEnabledRequest = {}));
var UpdateConfigurationSetTrackingOptionsRequest;
(function (UpdateConfigurationSetTrackingOptionsRequest) {
    /**
     * @internal
     */
    UpdateConfigurationSetTrackingOptionsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UpdateConfigurationSetTrackingOptionsRequest = exports.UpdateConfigurationSetTrackingOptionsRequest || (exports.UpdateConfigurationSetTrackingOptionsRequest = {}));
var UpdateConfigurationSetTrackingOptionsResponse;
(function (UpdateConfigurationSetTrackingOptionsResponse) {
    /**
     * @internal
     */
    UpdateConfigurationSetTrackingOptionsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UpdateConfigurationSetTrackingOptionsResponse = exports.UpdateConfigurationSetTrackingOptionsResponse || (exports.UpdateConfigurationSetTrackingOptionsResponse = {}));
var UpdateCustomVerificationEmailTemplateRequest;
(function (UpdateCustomVerificationEmailTemplateRequest) {
    /**
     * @internal
     */
    UpdateCustomVerificationEmailTemplateRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UpdateCustomVerificationEmailTemplateRequest = exports.UpdateCustomVerificationEmailTemplateRequest || (exports.UpdateCustomVerificationEmailTemplateRequest = {}));
var UpdateReceiptRuleRequest;
(function (UpdateReceiptRuleRequest) {
    /**
     * @internal
     */
    UpdateReceiptRuleRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UpdateReceiptRuleRequest = exports.UpdateReceiptRuleRequest || (exports.UpdateReceiptRuleRequest = {}));
var UpdateReceiptRuleResponse;
(function (UpdateReceiptRuleResponse) {
    /**
     * @internal
     */
    UpdateReceiptRuleResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UpdateReceiptRuleResponse = exports.UpdateReceiptRuleResponse || (exports.UpdateReceiptRuleResponse = {}));
var UpdateTemplateRequest;
(function (UpdateTemplateRequest) {
    /**
     * @internal
     */
    UpdateTemplateRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UpdateTemplateRequest = exports.UpdateTemplateRequest || (exports.UpdateTemplateRequest = {}));
var UpdateTemplateResponse;
(function (UpdateTemplateResponse) {
    /**
     * @internal
     */
    UpdateTemplateResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UpdateTemplateResponse = exports.UpdateTemplateResponse || (exports.UpdateTemplateResponse = {}));
var VerifyDomainDkimRequest;
(function (VerifyDomainDkimRequest) {
    /**
     * @internal
     */
    VerifyDomainDkimRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(VerifyDomainDkimRequest = exports.VerifyDomainDkimRequest || (exports.VerifyDomainDkimRequest = {}));
var VerifyDomainDkimResponse;
(function (VerifyDomainDkimResponse) {
    /**
     * @internal
     */
    VerifyDomainDkimResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(VerifyDomainDkimResponse = exports.VerifyDomainDkimResponse || (exports.VerifyDomainDkimResponse = {}));
var VerifyDomainIdentityRequest;
(function (VerifyDomainIdentityRequest) {
    /**
     * @internal
     */
    VerifyDomainIdentityRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(VerifyDomainIdentityRequest = exports.VerifyDomainIdentityRequest || (exports.VerifyDomainIdentityRequest = {}));
var VerifyDomainIdentityResponse;
(function (VerifyDomainIdentityResponse) {
    /**
     * @internal
     */
    VerifyDomainIdentityResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(VerifyDomainIdentityResponse = exports.VerifyDomainIdentityResponse || (exports.VerifyDomainIdentityResponse = {}));
var VerifyEmailAddressRequest;
(function (VerifyEmailAddressRequest) {
    /**
     * @internal
     */
    VerifyEmailAddressRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(VerifyEmailAddressRequest = exports.VerifyEmailAddressRequest || (exports.VerifyEmailAddressRequest = {}));
var VerifyEmailIdentityRequest;
(function (VerifyEmailIdentityRequest) {
    /**
     * @internal
     */
    VerifyEmailIdentityRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(VerifyEmailIdentityRequest = exports.VerifyEmailIdentityRequest || (exports.VerifyEmailIdentityRequest = {}));
var VerifyEmailIdentityResponse;
(function (VerifyEmailIdentityResponse) {
    /**
     * @internal
     */
    VerifyEmailIdentityResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(VerifyEmailIdentityResponse = exports.VerifyEmailIdentityResponse || (exports.VerifyEmailIdentityResponse = {}));
//# sourceMappingURL=models_0.js.map